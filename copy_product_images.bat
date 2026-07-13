@echo off
echo Copying new product images to project...
set "SRC=C:\Users\NIVETHA\.gemini\antigravity-ide\brain\28aa48bf-7385-4548-9617-fb900c2e942b"
set "DST=D:\PrintNova Studio\PrintNova Studio\images"

copy /Y "%SRC%\prod_card_matte_1783671322526.png"      "%DST%\prod_card_matte.png"
copy /Y "%SRC%\prod_card_spotuv_1783671333114.png"     "%DST%\prod_card_spotuv.png"
copy /Y "%SRC%\prod_card_foil_1783671343309.png"       "%DST%\prod_card_foil.png"
copy /Y "%SRC%\prod_card_kraft_1783671362555.png"      "%DST%\prod_card_kraft.png"
copy /Y "%SRC%\prod_banner_outdoor_1783671373679.png"  "%DST%\prod_banner_outdoor.png"
copy /Y "%SRC%\prod_banner_indoor_1783671384298.png"   "%DST%\prod_banner_indoor.png"
copy /Y "%SRC%\prod_banner_rollup_1783671406054.png"   "%DST%\prod_banner_rollup.png"
copy /Y "%SRC%\prod_flyer_a5_1783671415980.png"        "%DST%\prod_flyer_a5.png"
copy /Y "%SRC%\prod_brochure_trifold_1783671427095.png" "%DST%\prod_brochure_trifold.png"
copy /Y "%SRC%\prod_booklet_saddle_1783671446070.png"  "%DST%\prod_booklet_saddle.png"
copy /Y "%SRC%\prod_sticker_diecut_1783671467697.png"  "%DST%\prod_sticker_diecut.png"
copy /Y "%SRC%\prod_calendar_desk_1783671486599.png"   "%DST%\prod_calendar_desk.png"
copy /Y "%SRC%\prod_label_product_1783671496545.png"   "%DST%\prod_label_product.png"
copy /Y "%SRC%\prod_packaging_sleeves_1783671505683.png" "%DST%\prod_packaging_sleeves.png"
copy /Y "%SRC%\prod_boxes_custom_1783671680975.png"    "%DST%\prod_boxes_custom.png"

echo Done! All 15 product images copied.
pause
