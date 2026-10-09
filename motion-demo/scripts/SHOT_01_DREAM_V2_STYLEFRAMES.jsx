/* Groupe La Boussole - SHOT 01 V2 styleframes - After Effects 2024 */
(function () {
    var W = 1920, H = 1080, FPS = 25, DUR = 3.2;
    var C = {
        bg: [0.80, 0.94, 0.94],
        bgLight: [0.91, 0.98, 0.98],
        ink: [0.025, 0.105, 0.115],
        teal: [0.025, 0.43, 0.44],
        tealMid: [0.25, 0.68, 0.68],
        tealSoft: [0.56, 0.84, 0.84],
        coral: [0.95, 0.35, 0.30],
        skin: [0.39, 0.20, 0.13],
        skinLight: [0.55, 0.30, 0.20],
        paper: [0.96, 0.99, 0.98]
    };

    function folder(name, parent) {
        var i, item;
        for (i = 1; i <= app.project.numItems; i++) {
            item = app.project.item(i);
            if (item instanceof FolderItem && item.name === name && item.parentFolder === parent) return item;
        }
        item = app.project.items.addFolder(name);
        item.parentFolder = parent;
        return item;
    }

    function removeByName(name) {
        var i;
        for (i = app.project.numItems; i >= 1; i--) {
            if (app.project.item(i).name === name) app.project.item(i).remove();
        }
    }

    function solid(comp, name, color) {
        var l = comp.layers.addSolid(color, name, W, H, 1, DUR);
        l.locked = true;
        return l;
    }

    function rect(comp, name, size, pos, color, roundness, rotation) {
        var l = comp.layers.addShape();
        l.name = name;
        var g = l.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        g.name = name + "_VECTOR";
        var v = g.property("ADBE Vectors Group");
        var p = v.addProperty("ADBE Vector Shape - Rect");
        p.property("ADBE Vector Rect Size").setValue(size);
        p.property("ADBE Vector Rect Roundness").setValue(roundness || 0);
        var f = v.addProperty("ADBE Vector Graphic - Fill");
        f.property("ADBE Vector Fill Color").setValue(color);
        l.property("ADBE Transform Group").property("ADBE Position").setValue(pos);
        l.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(rotation || 0);
        return l;
    }

    function ellipse(comp, name, size, pos, color) {
        var l = comp.layers.addShape();
        l.name = name;
        var g = l.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        g.name = name + "_VECTOR";
        var v = g.property("ADBE Vectors Group");
        var p = v.addProperty("ADBE Vector Shape - Ellipse");
        p.property("ADBE Vector Ellipse Size").setValue(size);
        var f = v.addProperty("ADBE Vector Graphic - Fill");
        f.property("ADBE Vector Fill Color").setValue(color);
        l.property("ADBE Transform Group").property("ADBE Position").setValue(pos);
        return l;
    }

    function outlinedRect(comp, name, size, pos, color, width) {
        var l = comp.layers.addShape();
        l.name = name;
        var g = l.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        var v = g.property("ADBE Vectors Group");
        var p = v.addProperty("ADBE Vector Shape - Rect");
        p.property("ADBE Vector Rect Size").setValue(size);
        var s = v.addProperty("ADBE Vector Graphic - Stroke");
        s.property("ADBE Vector Stroke Color").setValue(color);
        s.property("ADBE Vector Stroke Width").setValue(width);
        s.property("ADBE Vector Stroke Line Join").setValue(2);
        l.property("ADBE Transform Group").property("ADBE Position").setValue(pos);
        return l;
    }

    function text(comp, name, value, pos, size, color) {
        var l = comp.layers.addText(value);
        l.name = name;
        var tdProp = l.property("ADBE Text Properties").property("ADBE Text Document");
        var td = tdProp.value;
        td.font = "Arial-BoldMT";
        td.fontSize = size;
        td.fillColor = color;
        td.applyFill = true;
        td.applyStroke = false;
        td.justification = ParagraphJustification.LEFT_JUSTIFY;
        td.tracking = 0;
        tdProp.setValue(td);
        l.property("ADBE Transform Group").property("ADBE Position").setValue(pos);
        return l;
    }

    function label(comp) {
        ellipse(comp, "BRAND_DOT", [14, 14], [164, 100], C.coral);
        var l = text(comp, "TXT_BRAND", "GROUPE LA BOUSSOLE", [184, 108], 22, C.ink);
        l.property("ADBE Transform Group").property("ADBE Opacity").setValue(72);
    }

    function background(comp) {
        solid(comp, "BG_AQUA", C.bg);
        ellipse(comp, "BG_LIGHT_POOL", [960, 960], [220, 180], C.bgLight);
        ellipse(comp, "BG_DEPTH_POOL", [740, 740], [1770, 990], C.tealSoft);
        label(comp);
    }

    function city(comp, opacity) {
        var specs = [
            [1030, 690, 92, 180], [1140, 655, 104, 250], [1260, 710, 80, 140],
            [1360, 620, 118, 320], [1500, 675, 104, 210], [1630, 640, 110, 280]
        ];
        var i, b;
        for (i = 0; i < specs.length; i++) {
            b = rect(comp, "CITY_BUILDING_" + (i + 1), [specs[i][2], specs[i][3]], [specs[i][0], specs[i][1]], i % 2 === 0 ? C.tealSoft : C.tealMid, 3, 0);
            b.property("ADBE Transform Group").property("ADBE Opacity").setValue(opacity);
        }
        rect(comp, "CITY_HORIZON", [690, 6], [1340, 798], C.tealMid, 3, 0).property("ADBE Transform Group").property("ADBE Opacity").setValue(opacity);
    }

    function woman(comp, opacity) {
        var parts = [];
        parts.push(rect(comp, "CHAR_BACK_TORSO", [190, 255], [1415, 715], C.teal, 82, -4));
        parts.push(rect(comp, "CHAR_NECK", [52, 72], [1410, 563], C.skin, 18, 0));
        parts.push(ellipse(comp, "CHAR_HEAD", [118, 138], [1410, 496], C.skinLight));
        parts.push(ellipse(comp, "CHAR_HAIR_MASS", [138, 112], [1404, 456], C.ink));
        parts.push(ellipse(comp, "CHAR_HAIR_BUN", [74, 74], [1460, 400], C.ink));
        parts.push(ellipse(comp, "CHAR_EAR", [25, 32], [1462, 507], C.skin));
        parts.push(rect(comp, "CHAR_ARM", [48, 214], [1510, 705], C.skinLight, 22, -18));
        parts.push(rect(comp, "CHAR_NOTEBOOK", [116, 156], [1560, 686], C.paper, 8, -12));
        parts.push(rect(comp, "CHAR_NOTEBOOK_EDGE", [6, 156], [1508, 675], C.coral, 3, -12));
        var i;
        for (i = 0; i < parts.length; i++) parts[i].property("ADBE Transform Group").property("ADBE Opacity").setValue(opacity);
    }

    function windowScene(comp, frameOpacity, sceneOpacity) {
        city(comp, sceneOpacity * 0.55);
        woman(comp, sceneOpacity);
        var frame = outlinedRect(comp, "WINDOW_FRAME", [760, 610], [1350, 525], C.ink, 9);
        frame.property("ADBE Transform Group").property("ADBE Opacity").setValue(frameOpacity);
        var divider = rect(comp, "WINDOW_DIVIDER", [7, 594], [1350, 525], C.ink, 3, 0);
        divider.property("ADBE Transform Group").property("ADBE Opacity").setValue(frameOpacity);
        var sill = rect(comp, "WINDOW_SILL", [824, 13], [1350, 836], C.ink, 7, 0);
        sill.property("ADBE Transform Group").property("ADBE Opacity").setValue(frameOpacity);
    }

    function finalTypography(comp, opacity) {
        var eyebrow = text(comp, "TXT_EYEBROW", "ET SI TOUT COMMENÇAIT PAR UNE IDÉE ?", [170, 392], 26, C.teal);
        eyebrow.property("ADBE Transform Group").property("ADBE Opacity").setValue(opacity * 0.8);
        var main = text(comp, "TXT_TU_REVES", "TU RÊVES", [164, 548], 116, C.ink);
        main.property("ADBE Transform Group").property("ADBE Opacity").setValue(opacity);
        var accent = rect(comp, "TEXT_ACCENT", [112, 10], [220, 608], C.coral, 5, 0);
        accent.property("ADBE Transform Group").property("ADBE Opacity").setValue(opacity);
    }

    function createStyleframe(name, stage, parent) {
        var comp = app.project.items.addComp(name, W, H, 1, DUR, FPS);
        comp.parentFolder = parent;
        comp.bgColor = C.bg;
        background(comp);

        if (stage === 0) {
            ellipse(comp, "GUIDE_DOT", [34, 34], [960, 540], C.teal);
            text(comp, "TXT_FRAME_NOTE", "00:00  —  LE POINT DE DÉPART", [164, 980], 18, C.teal).property("ADBE Transform Group").property("ADBE Opacity").setValue(45);
        } else if (stage === 1) {
            windowScene(comp, 100, 42);
            ellipse(comp, "GUIDE_DOT", [24, 24], [970, 220], C.coral);
            rect(comp, "GUIDE_TRACE", [380, 5], [1160, 220], C.coral, 3, 0);
            text(comp, "TXT_FRAME_NOTE", "00:01:10  —  LA VISION PREND FORME", [164, 980], 18, C.teal).property("ADBE Transform Group").property("ADBE Opacity").setValue(45);
        } else {
            windowScene(comp, 100, 100);
            finalTypography(comp, 100);
            text(comp, "TXT_FRAME_NOTE", "00:02:20  —  COMPOSITION PRINCIPALE", [164, 980], 18, C.teal).property("ADBE Transform Group").property("ADBE Opacity").setValue(45);
        }
        return comp;
    }

    app.beginUndoGroup("Build SHOT 01 V2 Styleframes");
    try {
        if (!app.project) app.newProject();
        removeByName("SF_01A_POINT_0000");
        removeByName("SF_01B_WINDOW_0110");
        removeByName("SF_01C_FINAL_0220");

        var root = folder("LA_BOUSSOLE_MOTION", app.project.rootFolder);
        var sfFolder = folder("00_STYLEFRAMES", root);
        createStyleframe("SF_01A_POINT_0000", 0, sfFolder);
        createStyleframe("SF_01B_WINDOW_0110", 1, sfFolder);
        var finalComp = createStyleframe("SF_01C_FINAL_0220", 2, sfFolder);
        finalComp.openInViewer();
        alert("SHOT 01 V2 : 3 styleframes créés.\n\nValide d'abord SF_01C_FINAL_0220 avant la phase d'animation.");
    } catch (e) {
        alert("SHOT_01_DREAM_V2_STYLEFRAMES\n\nErreur : " + e.toString() + "\nLigne : " + e.line);
    } finally {
        app.endUndoGroup();
    }
}());
