# GitHub Pages deploy script for Next.js static export

param(
    [string]$Message = "deploy: update portfolio"
)

Write-Host "Building static export..." -ForegroundColor Cyan
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Aborting deploy." -ForegroundColor Red
    exit 1
}

Write-Host "Configuring SPA fallback..." -ForegroundColor Cyan
# Copy the 404 page as index.html for SPA routing fallback
# GitHub Pages serves 404.html for unknown routes; this script can be extended
# to handle the SPA redirect if needed.

Write-Host "Deploying to gh-pages branch..." -ForegroundColor Cyan
npx gh-pages -d out -m "$Message"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deploy complete!" -ForegroundColor Green
} else {
    Write-Host "Deploy failed." -ForegroundColor Red
}
