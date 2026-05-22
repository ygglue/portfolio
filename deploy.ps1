# GitHub Pages deploy script for Next.js static export
# Handles SPA routing via trailing-slash redirect in 404.html

param(
    [string]$Message = "deploy: update portfolio"
)

Write-Host "Building static export..." -ForegroundColor Cyan
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Aborting deploy." -ForegroundColor Red
    exit 1
}

Write-Host "Configuring SPA fallback (trailing-slash redirect)..." -ForegroundColor Cyan
$redirectScript = "<script>(function(){var p=location.pathname;if(p!=='/'&&!p.endsWith('/')){location.href=p+'/'+location.search;}})();</script>"
$content = Get-Content -Path "out\404.html" -Raw
$newContent = $content -replace '<head>', "<head>`n  $redirectScript"
Set-Content -Path "out\404.html" -Value $newContent

Write-Host "Creating .nojekyll for GitHub Pages..." -ForegroundColor Cyan
New-Item -ItemType File -Path "out\.nojekyll" -Force | Out-Null

Write-Host "Deploying to gh-pages branch..." -ForegroundColor Cyan
npx gh-pages -d out -m "$Message"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deploy complete!" -ForegroundColor Green
} else {
    Write-Host "Deploy failed." -ForegroundColor Red
}
