#target photoshop

app.displayDialogs = DialogModes.NO;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.POINTS;

var W = 3508;
var H = 4961;
var DPI = 300;
var root = "D:/0.บ้านน้ำพร/1.งาน/สอน ปีการศึกษา 2568/สอน 2-68/Site69/poster_assets/";
var outPsd = "C:/Users/Nirut/Downloads/skin_sithao_poster_A3.psd";
var outJpg = "C:/Users/Nirut/Downloads/skin_sithao_poster_A3.jpg";
var outPng = "C:/Users/Nirut/Downloads/skin_sithao_poster_A3.png";

function th(s) { return decodeURIComponent(s); }
function c(r,g,b) { var x = new SolidColor(); x.rgb.red=r; x.rgb.green=g; x.rgb.blue=b; return x; }
function bpx(layer) {
  var b = layer.bounds;
  return {l:b[0].as("px"), t:b[1].as("px"), r:b[2].as("px"), b:b[3].as("px")};
}
function center(layer, x, y) {
  var b = bpx(layer);
  layer.translate(x - ((b.l+b.r)/2), y - ((b.t+b.b)/2));
}
function scale(layer, tw, th, cover) {
  var b = bpx(layer), lw=b.r-b.l, lh=b.b-b.t;
  var s = cover ? Math.max(tw/lw, th/lh) : Math.min(tw/lw, th/lh);
  layer.resize(s*100, s*100, AnchorPosition.MIDDLECENTER);
}
function addImage(path, name) {
  var src = app.open(File(path));
  src.activeLayer.name = name;
  var dup = src.activeLayer.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
  src.close(SaveOptions.DONOTSAVECHANGES);
  app.activeDocument = doc;
  doc.activeLayer = dup;
  dup.name = name;
  return dup;
}
function rect(name, x1,y1,x2,y2, color, opacity, mode) {
  app.activeDocument = doc;
  var layer = doc.artLayers.add();
  layer.name = name;
  layer.opacity = opacity;
  layer.blendMode = mode || BlendMode.NORMAL;
  doc.selection.select([[x1,y1],[x2,y1],[x2,y2],[x1,y2]]);
  doc.selection.fill(color, ColorBlendMode.NORMAL, 100, false);
  doc.selection.deselect();
  return layer;
}
function line(name, x1,y1,x2,y2, color, opacity) {
  var layer = doc.artLayers.add();
  layer.name = name;
  layer.opacity = opacity;
  doc.selection.select([[x1,y1],[x2,y2],[x2+8,y2+8],[x1+8,y1+8]]);
  doc.selection.fill(color, ColorBlendMode.NORMAL, 100, false);
  doc.selection.deselect();
  return layer;
}
function gradientBand(name, y1, y2, color, maxOp, reverse) {
  var layer = doc.artLayers.add();
  layer.name = name;
  var steps = 95, h = (y2-y1)/steps;
  for (var i=0;i<steps;i++) {
    var t = i/(steps-1);
    var op = reverse ? (1-t)*maxOp : t*maxOp;
    doc.selection.select([[0,y1+i*h],[W,y1+i*h],[W,y1+(i+1)*h+1],[0,y1+(i+1)*h+1]]);
    doc.selection.fill(color, ColorBlendMode.NORMAL, op, false);
  }
  doc.selection.deselect();
  return layer;
}
function text(name, value, size, x, y, color, font, opacity, just) {
  app.activeDocument = doc;
  var layer = doc.artLayers.add();
  layer.name = name;
  layer.kind = LayerKind.TEXT;
  layer.opacity = opacity || 100;
  var ti = layer.textItem;
  ti.contents = value;
  ti.size = size;
  ti.color = color;
  ti.justification = just || Justification.CENTER;
  try { ti.font = font; } catch(e) { ti.font = "Tahoma"; }
  ti.position = [x, y];
  center(layer, x, y);
  return layer;
}
function titleText(value) {
  var shadow = text("Title deep shadow", value, 154, W/2+26, 3890+38, c(0,0,0), "NotoSansThaiCondensed-Black", 82);
  shadow.applyGaussianBlur(5);
  text("Title warm backlight", value, 154, W/2, 3898, c(226,123,55), "NotoSansThaiCondensed-Black", 44);
  text("Title grey edge", value, 150, W/2, 3888, c(58,58,57), "NotoSansThaiCondensed-Black", 100);
  var main = text("Title main editable", value, 142, W/2, 3880, c(220,218,210), "NotoSansThaiCondensed-Black", 100);
  return main;
}
function addScanlines() {
  var layer = doc.artLayers.add();
  layer.name = "Game scanline texture";
  layer.opacity = 15;
  layer.blendMode = BlendMode.SCREEN;
  for (var y=0; y<H; y+=18) {
    doc.selection.select([[0,y],[W,y],[W,y+2],[0,y+2]]);
    doc.selection.fill(c(120,190,220), ColorBlendMode.NORMAL, 100, false);
  }
  doc.selection.deselect();
}
function addEmbers() {
  var layer = doc.artLayers.add();
  layer.name = "Orange guilt embers";
  layer.blendMode = BlendMode.SCREEN;
  for (var i=0;i<165;i++) {
    var x = 90 + Math.random()*(W-180);
    var y = 640 + Math.random()*(H-1000);
    var w = 3 + Math.random()*15;
    var h = 2 + Math.random()*7;
    doc.selection.select([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
    doc.selection.fill(c(255,128,44), ColorBlendMode.NORMAL, 28+Math.random()*48, false);
  }
  doc.selection.deselect();
  layer.applyGaussianBlur(0.9);
}
function addLogos() {
  var l1 = addImage(root+"logo_obec.png", "Logo OBEC");
  scale(l1, 330, 330, false); center(l1, W/2-520, 245);
  var l2 = addImage(root+"logo_upright.png", "Logo upright school");
  scale(l2, 390, 260, false); center(l2, W/2, 245);
  var l3 = addImage(root+"logo_nacc.png", "Logo NACC");
  scale(l3, 330, 330, false); center(l3, W/2+520, 245);
}

var doc = app.documents.add(W, H, DPI, "Skin_Sithao_A3_Poster", NewDocumentMode.RGB, DocumentFill.WHITE);
app.activeDocument = doc;

rect("Charcoal base", 0,0,W,H, c(5,8,13), 100, BlendMode.NORMAL);

var bg = addImage(root+"gaming_home.jpg", "Blurred gaming temptation background");
scale(bg, W, H, true); center(bg, W/2, H/2); bg.applyGaussianBlur(48); bg.opacity = 42;
rect("Grey-blue film grade", 0,0,W,H, c(20,32,42), 72, BlendMode.MULTIPLY);

var friends = addImage(root+"friends_tree.jpg", "Fair-play memory under tree");
scale(friends, W, 2100, true); center(friends, W/2, 2200); friends.opacity = 24; friends.blendMode = BlendMode.SCREEN;

var car = addImage(root+"car_moment.jpg", "Car and trust moment");
scale(car, 2100, 1560, true); center(car, 900, 1610); car.opacity = 54;
rect("Car moment dark veil", 0,800,1760,2520, c(0,0,0), 34, BlendMode.NORMAL);

var main = addImage(root+"guilt_classroom.jpg", "Main guilty face");
scale(main, W, 2850, true); center(main, 1080, 1840); main.opacity = 92;

rect("Central face warm shadow", 0,740,W,2880, c(112,64,38), 18, BlendMode.OVERLAY);
rect("Left moral darkness", 0,0,720,H, c(0,0,0), 55, BlendMode.NORMAL);
rect("Right moral darkness", W-610,0,W,H, c(0,0,0), 45, BlendMode.NORMAL);
gradientBand("Top theatrical fade", 0, 820, c(0,0,0), 88, true);
gradientBand("Bottom title fade", 2860, H, c(0,0,0), 96, false);

var home = addImage(root+"gaming_home.jpg", "Small gaming at home panel");
scale(home, 1120, 640, true); center(home, 2630, 1050); home.opacity = 58;
rect("Gaming panel dark frame", 2020,710,3210,1390, c(0,0,0), 26, BlendMode.NORMAL);

var carTop = addImage(root+"car_moment.jpg", "Visible car temptation inset");
scale(carTop, 980, 560, true); center(carTop, 820, 1045); carTop.opacity = 58;
rect("Car inset dark frame", 250, 750, 1390, 1350, c(0,0,0), 24, BlendMode.NORMAL);
text("Trust label", th("%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%84%E0%B8%A7%E0%B9%89%E0%B9%83%E0%B8%88"), 28, 820, 1300, c(231,205,160), "BaiJamjuree-SemiBold", 74);

rect("Phone UI panel", 2335, 2480, 3155, 3170, c(14,22,31), 76, BlendMode.NORMAL);
rect("Phone UI blue sheen", 2368, 2518, 3122, 3132, c(37,99,130), 28, BlendMode.SCREEN);
text("Phone UI label", th("%E0%B8%AA%E0%B8%81%E0%B8%B4%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88"), 30, 2745, 2588, c(238,205,143), "BaiJamjuree-SemiBold", 100);
text("Phone UI number", "999", 72, 2745, 2740, c(247,143,54), "BaiJamjuree-Bold", 95);
text("Phone UI word", "SKIN UNLOCKED", 25, 2745, 2885, c(190,220,230), "BaiJamjuree-Medium", 80);
line("Glitch orange 1", 2320, 3050, 3170, 2980, c(232,116,45), 70);
line("Glitch blue 1", 2250, 2630, 3130, 2570, c(78,180,215), 45);

rect("Envelope paper", 360, 3340, 1420, 3740, c(190,178,154), 58, BlendMode.NORMAL);
rect("Envelope shadow", 390, 3375, 1390, 3710, c(70,56,45), 22, BlendMode.MULTIPLY);
text("Envelope text", th("%E0%B8%8B%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87"), 34, 890, 3500, c(80,48,41), "BaiJamjuree-Bold", 86);
text("Envelope stamp", "RETURN", 34, 890, 3635, c(132,38,34), "BaiJamjuree-Bold", 58);

addScanlines();
addEmbers();
addLogos();

text("Script source", th("%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%9A%E0%B8%97%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B8%AA%E0%B8%B1%E0%B9%89%E0%B8%99%20%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%20%E0%B8%AA%E0%B8%81%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%B2"), 30, W/2, 548, c(218,200,166), "BaiJamjuree-Medium", 86);
text("Moral quote", th("%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%8B%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A2%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%81%E0%B8%97%E0%B9%89%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87%20%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%B2%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%20%E0%B9%83%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%94%E0%B9%89"), 34, W/2, 3265, c(224,207,174), "NotoSerifThai-SemiBold", 88);
rect("Title left gold rule", 500, 3650, 1380, 3660, c(206,122,55), 72, BlendMode.NORMAL);
rect("Title right gold rule", 2128, 3650, 3008, 3660, c(206,122,55), 72, BlendMode.NORMAL);
titleText(th("%E0%B8%AA%E0%B8%81%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B5%E0%B9%80%E0%B8%97%E0%B8%B2"));
text("Subtitle", th("%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B8%AA%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%95%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B8%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%95"), 45, W/2, 4248, c(238,157,77), "BaiJamjuree-Bold", 100);
text("School", th("%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%9E%E0%B8%A3%20%E0%B8%AA%E0%B8%9E%E0%B8%9B.%E0%B9%80%E0%B8%A5%E0%B8%A2%20%E0%B9%80%E0%B8%82%E0%B8%95%201"), 30, W/2, 4440, c(218,218,214), "BaiJamjuree-Medium", 88);
text("Footer anti corruption", th("%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%95%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B8%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%95%20%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%A3%E0%B8%B2%E0%B9%80%E0%B8%AD%E0%B8%87"), 25, W/2, 4782, c(229,229,226), "BaiJamjuree-Regular", 82);

var psd = new PhotoshopSaveOptions();
psd.layers = true;
doc.saveAs(File(outPsd), psd, true, Extension.LOWERCASE);

var jpg = new JPEGSaveOptions();
jpg.quality = 12;
jpg.embedColorProfile = true;
doc.saveAs(File(outJpg), jpg, true, Extension.LOWERCASE);

var png = new PNGSaveOptions();
doc.saveAs(File(outPng), png, true, Extension.LOWERCASE);
