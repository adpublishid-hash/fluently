param([string]$Dir)
$files = Get-ChildItem -Path $Dir -Filter "Lesson*.tsx" -File
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    if ($content -match "useNavigate") { Write-Host "SKIP: $($f.Name)"; continue }
    
    $content = $content -replace "import \{ ViewState \} from '[^']+';", "import { useNavigate } from 'react-router-dom';"
    $content = $content -replace "(?s)interface Lesson\w*Props \{[^}]+\}\s*\r?\n", ""
    $content = $content -replace "const \w+: React\.FC<\w+> = \(\{[^}]*\}\) => \{", "const LessonComponent: React.FC = () => {`n    const navigate = useNavigate();"
    $content = $content -replace "onNavigate\(ViewState\.\w+\)", "navigate(-1)"
    $content = $content -replace "onClick=\{onComplete\}", "onClick={() => navigate(-1)}"
    $content = $content -replace "\bonComplete\b\(\)", "navigate(-1)"
    
    $lessonName = $f.BaseName
    $content = $content -replace "const LessonComponent:", "const ${lessonName}:"
    $content = $content -replace "export default \w+;", "export default ${lessonName};"
    
    [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Adapted: $($f.Name)"
}
