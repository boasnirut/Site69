#target photoshop

app.displayDialogs = DialogModes.NO;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;

var W = 3508;
var H = 4961;
var DPI = 300;

var sourcePath = "C:/Users/Nirut/Downloads/S__22339625.jpg";
var referencePath = "C:/Users/Nirut/Downloads/reference_poster_style.jpg";
var outPsd = "C:/Users/Nirut/Downloads/shortfilm_poster_A3.psd";
var outJpg = "C:/Users/Nirut/Downloads/shortfilm_poster_A3.jpg";

function th(encoded) {
  return decodeURIComponent(encoded);
}

function color(r, g, b) {
  var c = new SolidColor();
  c.rgb.red = r;
  c.rgb.green = g;
  c.rgb.blue = b;
  return c;
}

function boundsPx(layer) {
  var b = layer.bounds;
  return {
    l: b[0].as("px"),
    t: b[1].as("px"),
    r: b[2].as("px"),
    b: b[3].as("px")
  };
}

function centerLayer(layer, x, y) {
  var b = boundsPx(layer);
  layer.translate(x - ((b.l + b.r) / 2), y - ((b.t + b.b) / 2));
}

function scaleLayer(layer, targetW, targetH, cover) {
  var b = boundsPx(layer);
  var lw = b.r - b.l;
  var lh = b.b - b.t;
  var scale = cover ? Math.max(targetW / lw, targetH / lh) : Math.min(targetW / lw, targetH / lh);
  layer.resize(scale * 100, scale * 100, AnchorPosition.MIDDLECENTER);
}

function addImageLayer(path, layerName) {
  var src = app.open(File(path));
  src.activeLayer.name = layerName;
  var duplicated = src.activeLayer.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
  src.close(SaveOptions.DONOTSAVECHANGES);
  app.activeDocument = doc;
  doc.activeLayer = duplicated;
  duplicated.name = layerName;
  return duplicated;
}

function fillRect(layerName, x1, y1, x2, y2, c, opacity, blendMode) {
  app.activeDocument = doc;
  var layer = doc.artLayers.add();
  layer.name = layerName;
  layer.blendMode = blendMode || BlendMode.NORMAL;
  doc.selection.select([[x1, y1], [x2, y1], [x2, y2], [x1, y2]]);
  doc.selection.fill(c, ColorBlendMode.NORMAL, opacity, false);
  doc.selection.deselect();
  return layer;
}

function addGradientBand(layerName, y1, y2, c, maxOpacity, reverse) {
  app.activeDocument = doc;
  var layer = doc.artLayers.add();
  layer.name = layerName;
  var steps = 90;
  var stepH = (y2 - y1) / steps;
  for (var i = 0; i < steps; i++) {
    var t = i / (steps - 1);
    var op = reverse ? (1 - t) * maxOpacity : t * maxOpacity;
    var top = y1 + (i * stepH);
    var bottom = y1 + ((i + 1) * stepH) + 1;
    doc.selection.select([[0, top], [W, top], [W, bottom], [0, bottom]]);
    doc.selection.fill(c, ColorBlendMode.NORMAL, op, false);
  }
  doc.selection.deselect();
  return layer;
}

function addText(layerName, text, size, x, y, c, fontName, opacity) {
  app.activeDocument = doc;
  var layer = doc.artLayers.add();
  layer.name = layerName;
  layer.kind = LayerKind.TEXT;
  layer.opacity = opacity || 100;
  var ti = layer.textItem;
  ti.contents = text;
  ti.size = size;
  ti.color = c;
  ti.justification = Justification.CENTER;
  try {
    ti.font = fontName || "Tahoma";
  } catch (e) {
    ti.font = "Tahoma";
  }
  ti.position = [W / 2, y];
  centerLayer(layer, x, y);
  return layer;
}

function addShadowedText(layerName, text, size, x, y, fillColor, outlineColor) {
  var shadow = addText(layerName + " shadow", text, size + 18, x + 18, y + 28, color(0, 0, 0), "Tahoma-Bold", 78);
  shadow.applyGaussianBlur(8);

  addText(layerName + " outline", text, size + 16, x, y + 4, outlineColor, "Tahoma-Bold", 100);
  var main = addText(layerName, text, size, x, y, fillColor, "Tahoma-Bold", 100);
  return main;
}

function addLogoStrip() {
  try {
    var ref = app.open(File(referencePath));
    ref.selection.select([[380, 38], [1035, 38], [1035, 270], [380, 270]]);
    ref.selection.copy(true);
    ref.close(SaveOptions.DONOTSAVECHANGES);
    app.activeDocument = doc;
    doc.paste();
    var logoLayer = doc.activeLayer;
    logoLayer.name = "Top logos from reference";
    scaleLayer(logoLayer, 1220, 300, false);
    centerLayer(logoLayer, W / 2, 310);
    logoLayer.opacity = 92;
  } catch (e) {
    addText("Header school name", th("%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%9E%E0%B8%A3%20%E0%B8%AA%E0%B8%9E%E0%B8%9B.%E0%B9%80%E0%B8%A5%E0%B8%A2%20%E0%B9%80%E0%B8%82%E0%B8%95%201"), 26, W / 2, 305, color(226, 200, 150), "Tahoma-Bold", 100);
  }
}

function addParticles() {
  app.activeDocument = doc;
  var layer = doc.artLayers.add();
  layer.name = "Cinematic ember particles";
  var orange = color(255, 124, 45);
  for (var i = 0; i < 120; i++) {
    var x = 120 + Math.random() * (W - 240);
    var y = 850 + Math.random() * (H - 1050);
    var w = 3 + Math.random() * 11;
    var h = 2 + Math.random() * 7;
    var op = 18 + Math.random() * 48;
    doc.selection.select([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
    doc.selection.fill(orange, ColorBlendMode.NORMAL, op, false);
  }
  doc.selection.deselect();
  layer.blendMode = BlendMode.SCREEN;
  layer.applyGaussianBlur(0.7);
}

var doc = app.documents.add(W, H, DPI, "Shortfilm_Poster_A3", NewDocumentMode.RGB, DocumentFill.WHITE);
app.activeDocument = doc;

fillRect("Dark base background", 0, 0, W, H, color(3, 8, 16), 100, BlendMode.NORMAL);

var bg = addImageLayer(sourcePath, "Blurred enlarged background");
scaleLayer(bg, W, H, true);
centerLayer(bg, W / 2, H / 2);
bg.applyGaussianBlur(42);
bg.opacity = 42;

fillRect("Deep blue color grade", 0, 0, W, H, color(5, 18, 32), 68, BlendMode.MULTIPLY);
fillRect("Warm lower glow", 0, 3100, W, H, color(118, 54, 25), 18, BlendMode.OVERLAY);

var memory1 = addImageLayer(sourcePath, "Left memory overlay");
scaleLayer(memory1, 770, 1440, false);
centerLayer(memory1, 690, 1725);
memory1.opacity = 28;
memory1.blendMode = BlendMode.SCREEN;

var memory2 = addImageLayer(sourcePath, "Large upper-right overlay");
scaleLayer(memory2, 2100, 3920, false);
centerLayer(memory2, 2590, 1420);
memory2.opacity = 23;
memory2.blendMode = BlendMode.SCREEN;

var hero = addImageLayer(sourcePath, "Main actor image");
scaleLayer(hero, 2220, 4160, false);
centerLayer(hero, W / 2, 2630);
hero.opacity = 100;

fillRect("Left edge shadow", 0, 0, 560, H, color(0, 0, 0), 38, BlendMode.NORMAL);
fillRect("Right edge shadow", W - 560, 0, W, H, color(0, 0, 0), 32, BlendMode.NORMAL);
addGradientBand("Top shadow gradient", 0, 1050, color(0, 0, 0), 82, true);
addGradientBand("Title support shadow gradient", 3250, H, color(0, 0, 0), 92, false);

addLogoStrip();

addText("Opening quote", th("%22%0D%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%8B%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A2%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%81%E0%B8%97%E0%B9%89%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%87%0D%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%B2%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%0D%E0%B9%83%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%94%E0%B9%89%0D%22"), 32, W / 2, 1080, color(217, 196, 160), "Tahoma", 92);

fillRect("Left gold title rule", 630, 3950, 1330, 3958, color(184, 121, 64), 80, BlendMode.NORMAL);
fillRect("Right gold title rule", 2178, 3950, 2878, 3958, color(184, 121, 64), 80, BlendMode.NORMAL);

addShadowedText("Title", th("%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B6%E0%B8%81%E0%B8%9C%E0%B8%B4%E0%B8%94"), 160, W / 2, 4170, color(214, 210, 202), color(61, 58, 56));
addText("Gold subtitle", th("%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B8%AA%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%95%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B8%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%95"), 42, W / 2, 4490, color(230, 166, 96), "Tahoma-Bold", 100);
addText("School credit", th("%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B8%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%95%20%7C%20%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%9E%E0%B8%A3%20%E0%B8%AA%E0%B8%9E%E0%B8%9B.%E0%B9%80%E0%B8%A5%E0%B8%A2%20%E0%B9%80%E0%B8%82%E0%B8%95%201"), 25, W / 2, 4685, color(216, 216, 214), "Tahoma", 86);
addText("Footer message", th("%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%95%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B8%E0%B8%88%E0%B8%A3%E0%B8%B4%E0%B8%95%20%E0%B9%80%E0%B8%A3%E0%B8%B4%E0%B9%88%E0%B8%A1%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%A3%E0%B8%B2%E0%B9%80%E0%B8%AD%E0%B8%87"), 22, W / 2, 4850, color(224, 224, 224), "Tahoma", 80);
addParticles();

var psdOptions = new PhotoshopSaveOptions();
psdOptions.layers = true;
doc.saveAs(File(outPsd), psdOptions, true, Extension.LOWERCASE);

var jpgOptions = new JPEGSaveOptions();
jpgOptions.quality = 12;
jpgOptions.embedColorProfile = true;
doc.saveAs(File(outJpg), jpgOptions, true, Extension.LOWERCASE);
