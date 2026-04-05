import os
import argparse
import re
import json
from dotenv import load_dotenv
from openai import OpenAI

# ==============================
# CARGAR ENV
# ==============================

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY)

# ==============================
# CONFIGURACION BASE (modo interno)
# ==============================

BASE_PATH = "src"

# ==============================
# OPCION: EXPANDIR DEPENDENCIAS INTERNAS
# ==============================

EXPAND_INTERNAL_DEPENDENCIES = False
# ==============================
# OPCIONES AVANZADAS
# ==============================

RESOLVE_PYTHON_IMPORTS = True
RESOLVE_FRONTEND_ALIASES = True
ENABLE_CONTEXT_COMPRESSION = True

INCLUDE_FILES_IN_REPO_TREE = True

folders_base_export = [
    "components",

    # "ui/renderers"    
]

file_name = "itera_grow_landing.txt"

# consulta para IA
message = ""

MAX_LINES_PER_FILE = 10000

IGNORE_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
    "venv",
    ".venv",
    "dist",
    "build",
    ".next",
    "coverage"
}

IGNORE_FILES = {
    "package-lock.json",
    "package.json",
    "vite.config.js",
    ".gitignore",
    "build_repo_context_v3.py",
    "build_repo_context_v4.py",
    "build_repo_context_v5.py",
    "build_repo_context_v5 copy.py",
    "context_versions.json",
    "repo_index.json",
    "build_repo_context_v5 copy 2.py",
    "build_repo_context_v5 copy 3.py"    
    
}

IGNORE_FILES_WITH_WORDS = [
    "copy",
]

VALID_EXTENSIONS = (
    ".py", ".js", ".ts", ".json",
    ".sql", ".txt", ".html", ".css", ".jsx"
)


# ==============================
# VERSIONADO DE CONTEXTO
# ==============================

CONTEXT_NAME = file_name.replace(".txt", "")
VERSION_FILE = "context_versions.json"
VERSION_HISTORY_DIR = "version_history"

# Comentario opcional asociado a la versión
VERSION_COMMENT = """
Inicial
"""


def should_ignore_file(file_name):
    normalized_file_name = file_name.lower()

    if file_name in IGNORE_FILES:
        return True

    base_name = os.path.splitext(normalized_file_name)[0]

    # Convierte separadores en espacios para detectar "palabras sueltas"
    # Ej: "widget copy 2.js" -> ["widget", "copy", "2"]
    # Ej: "copyrightHelper.js" -> ["copyrighthelper"]
    # widgetVirtualizationController copy.js → se ignora
    # widgetVirtualizationController-copy.js → se ignora
    # widgetVirtualizationController_copy.js → se ignora    
    tokens = re.sub(r"[^a-z0-9]+", " ", base_name).split()

    for word in IGNORE_FILES_WITH_WORDS:
        normalized_word = word.strip().lower()

        if normalized_word and normalized_word in tokens:
            return True

    return False

import hashlib
from datetime import datetime

def compute_hash(text):
    normalized = text.replace("\r\n", "\n")
    return hashlib.md5(normalized.encode("utf-8")).hexdigest()

def get_version_history_context_dir(output_file):
    base_name = os.path.splitext(os.path.basename(output_file))[0]
    return os.path.join(VERSION_HISTORY_DIR, base_name)

def ensure_version_history_dir(output_file):
    context_dir = get_version_history_context_dir(output_file)
    os.makedirs(context_dir, exist_ok=True)
    return context_dir

def get_versioned_output_path(output_file, version):
    base_name, ext = os.path.splitext(os.path.basename(output_file))
    context_dir = get_version_history_context_dir(output_file)
    return os.path.join(context_dir, f"{base_name}_v{version}{ext}")

def save_versioned_export(output_file, content, version):
    ensure_version_history_dir(output_file)
    versioned_path = get_versioned_output_path(output_file, version)

    with open(versioned_path, "w", encoding="utf-8") as f:
        f.write(content)

    return versioned_path

def load_version_data():
    if not os.path.exists(VERSION_FILE):
        return {}

    try:
        with open(VERSION_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data if isinstance(data, dict) else {}
    except Exception:
        return {}

def save_version_data(data):
    with open(VERSION_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def normalize_context_entry(raw_entry):
    """
    Soporta:
    formato viejo:
    {
      "version": 3,
      "last_updated": "2026-03-28"
    }

    formato nuevo:
    {
      "current_version": 3,
      "history": [...]
    }
    """
    if not isinstance(raw_entry, dict):
        return {
            "current_version": 0,
            "history": []
        }

    # Nuevo formato
    if "current_version" in raw_entry and "history" in raw_entry:
        history = raw_entry.get("history") or []
        history = sorted(history, key=lambda x: x.get("version", 0))

        normalized_history = []
        for item in history:
            normalized_history.append({
                "version": item.get("version"),
                "date": item.get("date"),
                "hash": item.get("hash"),
                "tokens": item.get("tokens"),
                "comment": item.get("comment", "")
            })

        current_version = raw_entry.get("current_version")
        if current_version is None:
            current_version = normalized_history[-1]["version"] if normalized_history else 0

        return {
            "current_version": current_version,
            "history": normalized_history
        }

    # Migración desde formato viejo
    old_version = int(raw_entry.get("version", 0) or 0)
    old_date = raw_entry.get("last_updated")

    if old_version > 0:
        return {
            "current_version": old_version,
            "history": [
                {
                    "version": old_version,
                    "date": old_date,
                    "hash": None,
                    "tokens": None,
                    "comment": ""
                }
            ]
        }

    return {
        "current_version": 0,
        "history": []
    }

def get_context_entry(data, context_name):
    entry = normalize_context_entry(data.get(context_name, {}))
    data[context_name] = entry
    return entry

def register_context_version(context_name, content_hash, tokens, comment=""):
    """
    - Si el hash no cambió, NO incrementa versión
    - Si cambió, crea una nueva versión
    - Si viene del formato viejo sin hash, rellena hash/tokens/comment sin incrementar
    """
    today = datetime.now().strftime("%Y-%m-%d")

    data = load_version_data()
    entry = get_context_entry(data, context_name)
    history = entry["history"]

    normalized_comment = (comment or "").strip()

    if history:
        latest = history[-1]

        # Primera corrida tras migrar del esquema viejo
        if not latest.get("hash"):
            latest["hash"] = content_hash
            latest["tokens"] = tokens
            latest["date"] = latest.get("date") or today
            latest["comment"] = normalized_comment
            entry["current_version"] = latest["version"]
            save_version_data(data)

            previous_version = history[-2]["version"] if len(history) > 1 else None

            return {
                "version": latest["version"],
                "date": latest["date"],
                "hash": latest["hash"],
                "tokens": latest["tokens"],
                "comment": latest["comment"],
                "changed": False,
                "previous_version": previous_version
            }

        # No hubo cambios reales
        if latest["hash"] == content_hash:
            latest["tokens"] = tokens

            # Si mandas comentario, actualiza el comentario de la versión actual
            if normalized_comment:
                latest["comment"] = normalized_comment
            else:
                latest["comment"] = latest.get("comment", "")

            entry["current_version"] = latest["version"]
            save_version_data(data)

            previous_version = history[-2]["version"] if len(history) > 1 else None

            return {
                "version": latest["version"],
                "date": latest["date"],
                "hash": latest["hash"],
                "tokens": latest["tokens"],
                "comment": latest["comment"],
                "changed": False,
                "previous_version": previous_version
            }

    # Sí hubo cambios -> nueva versión
    new_version = entry["current_version"] + 1
    new_record = {
        "version": new_version,
        "date": today,
        "hash": content_hash,
        "tokens": tokens,
        "comment": normalized_comment
    }

    history.append(new_record)
    entry["current_version"] = new_version
    save_version_data(data)

    previous_version = history[-2]["version"] if len(history) > 1 else None

    return {
        "version": new_version,
        "date": today,
        "hash": content_hash,
        "tokens": tokens,
        "comment": normalized_comment,
        "changed": True,
        "previous_version": previous_version
    }

def generate_context_metadata(context_name, version, date_str, previous_version=None):
    header_date = (date_str or datetime.now().strftime("%Y-%m-%d")).replace("-", "_")
    context_id = f"{context_name}_v{version}_{header_date}"

    prev_version = (
        f"{context_name}_v{previous_version}"
        if previous_version
        else "NONE"
    )

    header = f"""===== CONTEXTO v{version} =====

CONTEXT_ID: {context_id}
STATUS: ACTIVE
SUPERSEDES: {prev_version}

IMPORTANTE:
- Este contexto reemplaza cualquier versión anterior
- Ignorar completamente cualquier contexto previo
- Usar SOLO este contexto como fuente de verdad

"""
    return header

# ==============================
# RESOLVER DEPENDENCIAS INTERNAS
# ==============================

def resolve_internal_dependencies(selected_modules, all_dependencies, all_repo_files):

    expanded = set(selected_modules)
    queue = list(selected_modules)

    while queue:

        current = queue.pop(0)

        imports = all_dependencies.get(current, [])
        current_dir = os.path.dirname(current)

        for imp in imports:

            resolved_path = None

            # =========================
            # RELATIVE IMPORTS (JS)
            # =========================

            if imp.startswith("."):

                possible_paths = [
                    os.path.normpath(os.path.join(current_dir, imp + ".js")),
                    os.path.normpath(os.path.join(current_dir, imp + ".ts")),
                    os.path.normpath(os.path.join(current_dir, imp + ".py")),
                    os.path.normpath(os.path.join(current_dir, imp, "index.js")),
                    os.path.normpath(os.path.join(current_dir, imp, "index.ts")),
                ]

                for path in possible_paths:
                    if path in all_repo_files:
                        resolved_path = path
                        break

            # =========================
            # PYTHON IMPORTS
            # =========================

            elif RESOLVE_PYTHON_IMPORTS:

                resolved_path = resolve_python_import(imp, all_repo_files)

            # =========================
            # FRONTEND ALIASES
            # =========================

            if not resolved_path and RESOLVE_FRONTEND_ALIASES:
                resolved_path = resolve_frontend_alias(imp, all_repo_files)

            if resolved_path and resolved_path not in expanded:

                expanded.add(resolved_path)
                queue.append(resolved_path)

    return list(expanded)


# ==============================
# COMPRESION DE CONTEXTO
# ==============================

def compress_file_content(content):

    lines = content.splitlines()

    important = []

    patterns = [
        r"^import ",
        r"^from ",
        r"class ",
        r"def ",
        r"function ",
        r"const "
    ]

    for line in lines:
        for p in patterns:
            if re.search(p, line):
                important.append(line)
                break

    return "\n".join(important)

# ==============================
# RESOLVER IMPORTS PYTHON
# ==============================

def resolve_python_import(import_name, all_repo_files):

    path_guess = import_name.replace(".", "/") + ".py"
    path_guess = os.path.normpath(path_guess)

    for file in all_repo_files:
        if file.endswith(path_guess):
            return file

    return None


# ==============================
# RESOLVER ALIAS FRONTEND
# ==============================

def resolve_frontend_alias(import_name, all_repo_files):

    possible_paths = []

    if import_name.startswith("@/"):
        possible_paths.append(import_name.replace("@/", BASE_PATH + "/"))

    if import_name.startswith("src/"):
        possible_paths.append(import_name)

    for path in possible_paths:

        for ext in [".js", ".ts", ".jsx", ".tsx"]:

            candidate = os.path.normpath(path + ext)

            for repo_file in all_repo_files:
                if repo_file.endswith(candidate):
                    return repo_file

    return None
# ==============================
# DETECCION DE IMPORTS
# ==============================

def detect_imports(file_path, content):

    imports = []

    patterns = [
        r"import\s+([a-zA-Z0-9_\.]+)",
        r"from\s+([a-zA-Z0-9_\.]+)\s+import",
        r"import\s+.*\s+from\s+[\"'](.+)[\"']",
        r"require\([\"'](.+)[\"']\)"
    ]

    for pattern in patterns:
        matches = re.findall(pattern, content)
        imports.extend(matches)

    return list(set(imports))

# ==============================
# EXTRAER FUNCIONES Y CLASES
# ==============================

def extract_symbols(content):

    functions = re.findall(r"def\s+([a-zA-Z0-9_]+)\(", content)
    classes = re.findall(r"class\s+([a-zA-Z0-9_]+)", content)

    js_functions = re.findall(r"function\s+([a-zA-Z0-9_]+)\(", content)
    arrow_functions = re.findall(r"const\s+([a-zA-Z0-9_]+)\s*=\s*\(", content)

    functions.extend(js_functions)
    functions.extend(arrow_functions)

    return {
        "functions": list(set(functions)),
        "classes": list(set(classes))
    }

# ==============================
# ESTIMACION DE TOKENS
# ==============================

def estimate_tokens(text):
    return int(len(text) / 4)

# ==============================
# FUNCION: GENERAR ARBOL DEL REPO
# ==============================

def generate_repo_tree(base_path):
    tree_lines = []

    for root, dirs, files in os.walk(base_path):
        dirs[:] = sorted([d for d in dirs if d not in IGNORE_DIRS])
        files = sorted(files)

        level = root.replace(base_path, "").count(os.sep)
        indent = "│   " * level
        folder_name = os.path.basename(root)

        if level == 0:
            tree_lines.append(".")
        else:
            tree_lines.append(f"{indent}├── {folder_name}")

        if INCLUDE_FILES_IN_REPO_TREE:
            file_indent = "│   " * (level + 1)

            for file in files:
                if should_ignore_file(file):
                    continue

                if not file.endswith(VALID_EXTENSIONS):
                    continue

                tree_lines.append(f"{file_indent}├── {file}")

    return "\n".join(tree_lines)

# ==============================
# FUNCION: EXPORTAR ARCHIVOS
# ==============================

def process_folder(folder):
    exported_files = []
    file_contents = []
    dependencies = {}

    for root, dirs, files in os.walk(folder):
        dirs[:] = sorted([d for d in dirs if d not in IGNORE_DIRS])

        for file in sorted(files):
            if should_ignore_file(file):
                continue

            if not file.endswith(VALID_EXTENSIONS):
                continue

            filepath = os.path.normpath(os.path.join(root, file))
            exported_files.append(filepath)

            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    lines = f.readlines()
                    text_content = "".join(lines)

                    imports = detect_imports(filepath, text_content)
                    dependencies[filepath] = imports

                    if len(lines) > MAX_LINES_PER_FILE:
                        content = "".join(lines[:MAX_LINES_PER_FILE])
                        content += "\n\n[FILE TRUNCATED - TOO LARGE]"
                    else:
                        content = text_content

            except Exception:
                content = "[NO SE PUDO LEER EL ARCHIVO]"
                dependencies[filepath] = []

            block = f"\n\n# FILE: {filepath}\n\n{content}"
            file_contents.append(block)

    return exported_files, file_contents, dependencies



def build_full_context_body(repo_tree, all_exported_files, all_dependencies, all_file_contents):
    output_lines = []

    output_lines.append("# CODEBASE CONTEXT EXPORT\n\n")

    output_lines.append("## REPOSITORY STRUCTURE\n\n")
    output_lines.append(repo_tree)

    output_lines.append("\n\n## EXPORTED FILE INDEX\n\n")
    for i, file in enumerate(all_exported_files, 1):
        output_lines.append(f"{i}. {file}\n")

    output_lines.append("\n\n## MODULE DEPENDENCIES\n\n")
    for file in sorted(all_dependencies):
        imports = all_dependencies[file]

        output_lines.append(f"\n{file}\n")

        if not imports:
            output_lines.append("  - no imports detected\n")
        else:
            for imp in sorted(imports):
                output_lines.append(f"  -> {imp}\n")

    output_lines.append("\n\n## FILE CONTENTS\n")
    for block in all_file_contents:
        output_lines.append(block)

    body_without_tokens = "".join(output_lines)
    tokens = estimate_tokens(body_without_tokens)

    final_body = body_without_tokens
    final_body += "\n\n## TOKEN ESTIMATE\n\n"
    final_body += f"Approx tokens: {tokens}\n"

    return final_body, tokens

# ==============================
# INDEXAR REPOSITORIO
# ==============================

def build_repo_index(exported_files):

    repo_index = {}

    for filepath in exported_files:

        try:

            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            imports = detect_imports(filepath, content)
            symbols = extract_symbols(content)

            repo_index[filepath] = {
                "imports": imports,
                "functions": symbols["functions"],
                "classes": symbols["classes"]
            }

        except Exception:

            repo_index[filepath] = {
                "imports": [],
                "functions": [],
                "classes": []
            }

    return repo_index

# ==============================
# IA SELECCION DE MODULOS
# ==============================

def ai_select_modules(query, repo_index, widget_context):

    system_prompt = """
You are a senior software architect.

Your task is to analyze a repository index and the global repository context.

Based on the user question, return the list of modules that are most relevant.

Return STRICT JSON format:

{
  "selected_modules": ["file1.py","file2.py"],
  "reasoning": "short explanation"
}

Rules:
- Only include files that exist in repo_index.
- Prefer modules directly related to the query.
- Maximum 8 modules.
"""

    user_prompt = f"""
USER QUESTION:
{query}

REPOSITORY INDEX:
{json.dumps(repo_index, indent=2)}

GLOBAL CONTEXT:
{widget_context}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    raw = response.choices[0].message.content

    try:
        parsed = json.loads(raw)

        modules = parsed.get("selected_modules", [])
        reasoning = parsed.get("reasoning", "")

        return modules, reasoning
    except:
        return [], ""

# ==============================
# CONSTRUIR CONTEXTO DINAMICO
# ==============================
def build_dynamic_context(selected_modules, repo_tree, all_dependencies, reasoning, query, header):
    output_lines = []

    # El header va primero, sin nada antes
    output_lines.append(header)
    output_lines.append("# CODEBASE DYNAMIC CONTEXT\n")

    output_lines.append("\n## USER QUERY\n")
    output_lines.append(query)

    output_lines.append("\n\n## AI MODULE SELECTION REASONING\n")
    output_lines.append(reasoning)

    output_lines.append("\n## REPOSITORY STRUCTURE\n")
    output_lines.append(repo_tree)

    output_lines.append("\n\n## EXPORTED FILE INDEX\n")
    for i, file in enumerate(selected_modules, 1):
        output_lines.append(f"{i}. {file}\n")

    output_lines.append("\n\n## MODULE DEPENDENCIES\n")
    for file in selected_modules:
        file = os.path.normpath(file)
        output_lines.append(f"\n{file}\n")

        imports = all_dependencies.get(file, [])
        if not imports:
            output_lines.append("  - no imports detected\n")
        else:
            for imp in sorted(imports):
                output_lines.append(f"  -> {imp}\n")

    output_lines.append("\n\n## FILE CONTENTS\n")
    for file in selected_modules:
        try:
            with open(file, "r", encoding="utf-8") as f:
                content = f.read()

                if ENABLE_CONTEXT_COMPRESSION:
                    content = compress_file_content(content)

            output_lines.append(f"\n\n# FILE: {file}\n")
            output_lines.append(content)

        except Exception:
            output_lines.append(f"\n\n# FILE: {file}\n")
            output_lines.append("[NO SE PUDO LEER EL ARCHIVO]")

    dynamic_text = "".join(output_lines)
    tokens = estimate_tokens(dynamic_text)

    dynamic_text += "\n\n## TOKEN ESTIMATE\n\n"
    dynamic_text += f"Approx tokens: {tokens}\n"

    return dynamic_text

# ==============================
# MAIN
# ==============================

def main():

    parser = argparse.ArgumentParser(description="Codebase Exporter v5")
    

    parser.add_argument(
        "-f", "--folders",
        nargs="+",
        help="Carpetas a exportar"
    )

    parser.add_argument(
        "-o", "--output",
        help="Nombre del archivo de salida"
    )

    args = parser.parse_args()

    folders = args.folders if args.folders else folders_base_export
    output = args.output if args.output else file_name

    print("\nExportando contexto del repositorio...\n")

    repo_tree = generate_repo_tree(".")

    all_exported_files = []
    all_file_contents = []
    all_dependencies = {}

    for folder in folders:

        full_path = os.path.join(BASE_PATH, folder)

        if not os.path.exists(full_path):
            print(f"⚠ Carpeta no encontrada: {full_path}")
            continue

        print(f"Procesando: {full_path}")

        exported_files, file_contents, deps = process_folder(full_path)

        all_exported_files.extend(exported_files)
        all_file_contents.extend(file_contents)
        all_dependencies.update(deps)

    repo_index = build_repo_index(all_exported_files)

    with open("repo_index.json", "w", encoding="utf-8") as f:
        json.dump(repo_index, f, indent=2)

    print("Indice del repositorio generado: repo_index.json")

    full_context_body, token_estimate = build_full_context_body(
        repo_tree,
        all_exported_files,
        all_dependencies,
        all_file_contents
    )

    content_hash = compute_hash(full_context_body)

    version_info = register_context_version(
        CONTEXT_NAME,
        content_hash,
        token_estimate,
        VERSION_COMMENT
    )

    header = generate_context_metadata(
        CONTEXT_NAME,
        version_info["version"],
        version_info["date"],
        version_info["previous_version"]
    )

    widget_context = header + full_context_body

    with open(output, "w", encoding="utf-8") as outfile:
        outfile.write(widget_context)

    versioned_output_path = save_versioned_export(
        output,
        widget_context,
        version_info["version"]
    )

    print("\nExport completado")
    print(f"Archivo generado: {output}")
    print(f"Archivo versionado: {versioned_output_path}")
    print(f"Archivos exportados: {len(all_exported_files)}")
    print(f"Tokens aproximados: {token_estimate}")

    if version_info["changed"]:
        print(f"Nueva versión generada: v{version_info['version']}")
    else:
        print(f"Sin cambios reales. Se reutiliza la versión: v{version_info['version']}")

    if version_info.get("comment"):
        print(f"Comentario de versión: {version_info['comment']}")



    # ==============================
    # CONTEXTO DINAMICO CON IA
    # ==============================

    if message.strip():

        print("\nSeleccionando modulos con IA...")
        print("Consulta:", message)

        selected_modules, reasoning = ai_select_modules(
            message,
            repo_index,
            widget_context
        )
        selected_modules = [os.path.normpath(f) for f in selected_modules]
        print("\nModulos seleccionados por la IA:\n")
        
        
        # ==============================
        # EXPANDIR DEPENDENCIAS INTERNAS (OPCIONAL)
        # ==============================

        if EXPAND_INTERNAL_DEPENDENCIES:

            print("\nResolviendo dependencias internas...")

            selected_modules = resolve_internal_dependencies(
                selected_modules,
                all_dependencies,
                set(all_exported_files)
            )

            print("\nModulos despues de expandir dependencias:\n")

            for i, module in enumerate(selected_modules, 1):
                print(f"{i}. {module}")        
                

        for i, module in enumerate(selected_modules, 1):
            print(f"{i}. {module}")
            
        print("\nReasoning de la IA:")
        print(reasoning)
        
        dynamic_context = build_dynamic_context(
            selected_modules,
            repo_tree,
            all_dependencies,
            reasoning,
            message,
            header
        )

        with open("dynamic_context.txt", "w", encoding="utf-8") as f:
            f.write(dynamic_context)

        print("Contexto dinamico generado: dynamic_context.txt")


if __name__ == "__main__":
    main()