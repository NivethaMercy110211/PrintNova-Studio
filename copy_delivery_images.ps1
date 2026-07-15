Write-Host "Copying newly generated delivery, enterprise, home2 banner, and bookmarks images to the project folder..."
$SRC="C:\Users\NIVETHA\.gemini\antigravity-ide\brain\167ad293-24df-43c0-b73a-2d8ac3d44220"
$DST="D:\PrintNova Studio\PrintNova Studio\images"

# Ensure destination exists
if (!(Test-Path -Path $DST)) {
    New-Item -ItemType Directory -Force -Path $DST
}
if (!(Test-Path -Path "$DST\banners")) {
    New-Item -ItemType Directory -Force -Path "$DST\banners"
}

# Delivery Options Images
Copy-Item "$SRC\delivery_rush_1783942256299.png" -Destination "$DST\delivery_rush.png" -Force
Copy-Item "$SRC\delivery_express_1783942281699.png" -Destination "$DST\delivery_express.png" -Force
Copy-Item "$SRC\delivery_standard_1783942303420.png" -Destination "$DST\delivery_standard.png" -Force
Copy-Item "$SRC\delivery_pickup_1783942342564.png" -Destination "$DST\delivery_pickup.png" -Force

# Enterprise Solutions Images
Copy-Item "$SRC\enterprise_shipping_1783942859117.png" -Destination "$DST\enterprise_shipping.png" -Force
Copy-Item "$SRC\enterprise_manager_1783942872905.png" -Destination "$DST\enterprise_manager.png" -Force
Copy-Item "$SRC\enterprise_billing_1783942892357.png" -Destination "$DST\enterprise_billing.png" -Force

# Banner Images
Copy-Item "C:\Users\NIVETHA\.gemini\antigravity-ide\brain\f8244bf8-b4bd-4e10-b100-9e92dfd1f49f\banner_home2_clean_1784107057236.png" -Destination "$DST\banners\home2.png" -Force

# Auth Images
Copy-Item "C:\Users\NIVETHA\.gemini\antigravity-ide\brain\f8244bf8-b4bd-4e10-b100-9e92dfd1f49f\auth_forgot_1784108678622.png" -Destination "$DST\auth\forgot.png" -Force

# Product Images
Copy-Item "$SRC\product_bookmarks_1783963865951.png" -Destination "$DST\product_bookmarks.png" -Force

Write-Host "Done! Copying complete."
