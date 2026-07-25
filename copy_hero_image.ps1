Write-Host "Copying newly generated hero print mockup image to the project folder..."
$SRC="C:\Users\NIVETHA\.gemini\antigravity-ide\brain\9cc01bb4-d897-4782-8b10-37ea2616c0c7"
$DST="d:\PrintNova Studio\PrintNova Studio\images"

if (!(Test-Path -Path $DST)) {
    New-Item -ItemType Directory -Force -Path $DST
}

if (!(Test-Path -Path "$DST\banners")) {
    New-Item -ItemType Directory -Force -Path "$DST\banners"
}

Copy-Item "$SRC\hero_print_mockup_1784974739644.png" -Destination "$DST\hero_print_mockup.png" -Force
Copy-Item "$SRC\banner_home_hero_bg_1784974987682.png" -Destination "$DST\banners\home.png" -Force

Write-Host "Done! Copying complete."

