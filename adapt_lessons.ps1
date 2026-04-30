# adapt_lessons.ps1 — Batch-adapt ai-kamus lesson files for Talky React Router integration
# Handles: vocabulary, grammar, pronunciation lesson patterns

param(
    [string]$Dir
)

$files = Get-ChildItem -Path $Dir -Filter "Lesson*.tsx" -File

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    
    # Skip if already adapted
    if ($content -match "useNavigate") { 
        Write-Host "SKIP (already adapted): $($f.Name)"
        continue 
    }

    # 1. Replace ViewState import with useNavigate
    $content = $content -replace "import \{ ViewState \} from '[^']+';", "import { useNavigate } from 'react-router-dom';"

    # 2. Remove interface blocks (multi-line Lesson props)
    $content = $content -replace "(?s)interface Lesson\w*Props \{[^}]+\}\s*\r?\n", ""

    # 3. Replace component signatures — various patterns
    # Pattern A: const Lesson1: React.FC<Lesson1Props> = ({ onNavigate, userParams, onComplete }) => {
    $content = $content -replace "const \w+: React\.FC<\w+> = \(\{[^}]*\}\) => \{", "const LessonComponent: React.FC = () => {`n    const navigate = useNavigate();"
    
    # Pattern B: const Lesson1: React.FC<Lesson1Props> = ({ onNavigate, userParams }) => {
    # (already caught by pattern A)

    # 4. Replace all onNavigate calls with navigate(-1)
    $content = $content -replace "onNavigate\(ViewState\.\w+\)", "navigate(-1)"
    
    # 5. Replace onComplete calls
    $content = $content -replace "onClick=\{onComplete\}", "onClick={() => navigate(-1)}"
    $content = $content -replace "\bonComplete\b\(\)", "navigate(-1)"

    # 6. Fix default export to match the original name
    $lessonName = $f.BaseName
    $content = $content -replace "const LessonComponent:", "const ${lessonName}:"
    # Also fix React.FC type
    $content = $content -replace "export default \w+;", "export default ${lessonName};"

    Set-Content -Path $f.FullName -Value $content -NoNewline
    Write-Host "Adapted: $($f.Name)"
}
