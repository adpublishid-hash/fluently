param([string]$Dir)
$files = Get-ChildItem -Path $Dir -Filter "Lesson*.tsx" -File
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    
    # Remove interface block
    $content = $content -replace "(?s)interface Lesson\w*Props \{.*?\r?\n\}\r?\n", ""
    
    # Clean up ViewState
    $content = $content -replace "import \{ ViewState \} from '[^']+';?
", ""
    
    [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Cleaned: $($f.Name)"
}
