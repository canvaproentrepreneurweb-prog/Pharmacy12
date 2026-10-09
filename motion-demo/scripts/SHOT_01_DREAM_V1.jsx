/*
  Groupe La Boussole - SHOT 01 DREAM V1
  After Effects ExtendScript - 1920x1080, 25 fps, 3.2 seconds
*/
(function () {
    var W = 1920;
    var H = 1080;
    var FPS = 25;
    var DURATION = 3.2;

    var COLORS = {
        bg: [0.784, 0.933, 0.933],
        ink: [0.027, 0.114, 0.125],
        teal: [0.031, 0.478, 0.482],
        coral: [0.945, 0.357, 0.306],
        white: [0.965, 1.0, 1.0]
    };

    function fail(message) {
        alert("SHOT_01_DREAM_V1\n\n" + message);
        throw new Error(message);
    }

    function findOrCreateFolder(name, parentFolder) {
        var i;
        for (i = 1; i <= app.project.numItems; i++) {
            var item = app.project.item(i);
            if (item instanceof FolderItem && item.name === name && item.parentFolder === parentFolder) {
                return item;
            }
        }
        var folder = app.project.items.addFolder(name);
        folder.parentFolder = parentFolder;
        return folder;
    }

    function removeProjectItemByName(name) {
        var i;
        for (i = app.project.numItems; i >= 1; i--) {
            if (app.project.item(i).name === name) {
                app.project.item(i).remove();
            }
        }
    }

    function addSlider(layer, name, value) {
        var effect = layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
        effect.name = name;
        effect.property("ADBE Slider Control-0001").setValue(value);
        return effect;
    }

    function setKeys(prop, times, values) {
        var i;
        for (i = 0; i < times.length; i++) {
            prop.setValueAtTime(times[i], values[i]);
        }
    }

    function easeKeys(prop, influenceIn, influenceOut) {
        var i;
        for (i = 1; i <= prop.numKeys; i++) {
            var dims = 1;
            var valueType = prop.propertyValueType;

            // Spatial properties use one temporal speed curve for the path.
            // Non-spatial 2D/3D properties require one ease object per dimension.
            if (valueType === PropertyValueType.TwoD) {
                dims = 2;
            } else if (valueType === PropertyValueType.ThreeD) {
                dims = 3;
            }
            var easeIn = [];
            var easeOut = [];
            var d;
            for (d = 0; d < dims; d++) {
                easeIn.push(new KeyframeEase(0, influenceIn));
                easeOut.push(new KeyframeEase(0, influenceOut));
            }
            prop.setTemporalEaseAtKey(i, easeIn, easeOut);
            prop.setInterpolationTypeAtKey(i, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
        }
    }

    function addRectangle(comp, name, size, position, fillColor, roundness) {
        var layer = comp.layers.addShape();
        layer.name = name;
        var group = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        group.name = name + "_GROUP";
        var contents = group.property("ADBE Vectors Group");
        var rect = contents.addProperty("ADBE Vector Shape - Rect");
        rect.property("ADBE Vector Rect Size").setValue(size);
        rect.property("ADBE Vector Rect Roundness").setValue(roundness || 0);
        var fill = contents.addProperty("ADBE Vector Graphic - Fill");
        fill.property("ADBE Vector Fill Color").setValue(fillColor);
        layer.property("ADBE Transform Group").property("ADBE Position").setValue(position);
        return layer;
    }

    function addEllipse(comp, name, diameter, position, fillColor) {
        var layer = comp.layers.addShape();
        layer.name = name;
        var group = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        group.name = name + "_GROUP";
        var contents = group.property("ADBE Vectors Group");
        var ellipse = contents.addProperty("ADBE Vector Shape - Ellipse");
        ellipse.property("ADBE Vector Ellipse Size").setValue([diameter, diameter]);
        var fill = contents.addProperty("ADBE Vector Graphic - Fill");
        fill.property("ADBE Vector Fill Color").setValue(fillColor);
        layer.property("ADBE Transform Group").property("ADBE Position").setValue(position);
        return layer;
    }

    function addWindowOutline(comp) {
        var layer = comp.layers.addShape();
        layer.name = "SHAPE_WINDOW_OUTLINE";
        var group = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        group.name = "WINDOW_FRAME";
        var contents = group.property("ADBE Vectors Group");
        var rect = contents.addProperty("ADBE Vector Shape - Rect");
        rect.property("ADBE Vector Rect Size").setValue([720, 500]);
        rect.property("ADBE Vector Rect Position").setValue([0, 0]);
        var stroke = contents.addProperty("ADBE Vector Graphic - Stroke");
        stroke.property("ADBE Vector Stroke Color").setValue(COLORS.ink);
        stroke.property("ADBE Vector Stroke Width").setValue(16);
        stroke.property("ADBE Vector Stroke Line Cap").setValue(2);
        var trim = contents.addProperty("ADBE Vector Filter - Trim");
        trim.name = "DRAW_WINDOW";
        trim.property("ADBE Vector Trim Start").setValue(0);
        var end = trim.property("ADBE Vector Trim End");
        setKeys(end, [0.48, 1.42], [0, 100]);
        easeKeys(end, 70, 70);
        layer.property("ADBE Transform Group").property("ADBE Position").setValue([1210, 580]);
        return layer;
    }

    function addText(comp, name, text, position, fontSize, color) {
        var layer = comp.layers.addText(text);
        layer.name = name;
        var doc = layer.property("ADBE Text Properties").property("ADBE Text Document").value;
        doc.font = "Arial-BoldMT";
        doc.fontSize = fontSize;
        doc.applyFill = true;
        doc.fillColor = color;
        doc.applyStroke = false;
        doc.justification = ParagraphJustification.LEFT_JUSTIFY;
        doc.tracking = 0;
        layer.property("ADBE Text Properties").property("ADBE Text Document").setValue(doc);
        layer.property("ADBE Transform Group").property("ADBE Position").setValue(position);
        return layer;
    }

    function addMarker(layer, time, comment) {
        layer.property("ADBE Marker").setValueAtTime(time, new MarkerValue(comment));
    }

    function buildShot(compFolder) {
        var comp = app.project.items.addComp("SHOT_01_DREAM_V1", W, H, 1, DURATION, FPS);
        comp.parentFolder = compFolder;
        comp.bgColor = COLORS.bg;

        var bg = comp.layers.addSolid(COLORS.bg, "BG_AQUA", W, H, 1, DURATION);
        bg.locked = true;

        var ctrl = comp.layers.addNull(DURATION);
        ctrl.name = "CTRL_SHOT_01";
        ctrl.label = 10;
        addSlider(ctrl, "Motion Intensity", 100);
        addSlider(ctrl, "Overshoot", 8);
        addSlider(ctrl, "Texture Amount", 4);
        ctrl.guideLayer = true;

        var dot = addEllipse(comp, "SHAPE_GUIDE_DOT", 34, [420, 520], COLORS.teal);
        var dotPos = dot.property("ADBE Transform Group").property("ADBE Position");
        setKeys(dotPos, [0.16, 0.74, 1.18], [[420, 520], [850, 330], [1210, 330]]);
        easeKeys(dotPos, 72, 72);
        var dotScale = dot.property("ADBE Transform Group").property("ADBE Scale");
        setKeys(dotScale, [0.0, 0.16, 1.16, 1.38], [[0, 0], [100, 100], [100, 100], [0, 0]]);
        easeKeys(dotScale, 75, 75);

        var windowLayer = addWindowOutline(comp);
        var windowOpacity = windowLayer.property("ADBE Transform Group").property("ADBE Opacity");
        setKeys(windowOpacity, [0.40, 0.50], [0, 100]);

        var sill = addRectangle(comp, "SHAPE_WINDOW_SILL", [790, 18], [1210, 842], COLORS.ink, 9);
        var sillScale = sill.property("ADBE Transform Group").property("ADBE Scale");
        setKeys(sillScale, [1.18, 1.58], [[0, 100], [100, 100]]);
        easeKeys(sillScale, 75, 75);

        var head = addEllipse(comp, "CHAR_HEAD", 104, [1210, 560], COLORS.ink);
        var body = addRectangle(comp, "CHAR_BODY", [154, 238], [1210, 704], COLORS.ink, 70);
        var shoulder = addRectangle(comp, "CHAR_SHOULDERS", [246, 94], [1210, 642], COLORS.ink, 47);
        var characterLayers = [head, body, shoulder];
        var i;
        for (i = 0; i < characterLayers.length; i++) {
            var op = characterLayers[i].property("ADBE Transform Group").property("ADBE Opacity");
            setKeys(op, [1.14 + i * 0.04, 1.52 + i * 0.04], [0, 100]);
            easeKeys(op, 70, 70);
            var sc = characterLayers[i].property("ADBE Transform Group").property("ADBE Scale");
            setKeys(sc, [1.14 + i * 0.04, 1.58 + i * 0.04], [[86, 86], [100, 100]]);
            easeKeys(sc, 72, 72);
        }

        var accent = addRectangle(comp, "SHAPE_TEXT_ACCENT", [92, 12], [410, 706], COLORS.coral, 6);
        var accentScale = accent.property("ADBE Transform Group").property("ADBE Scale");
        setKeys(accentScale, [1.46, 1.78], [[0, 100], [100, 100]]);
        easeKeys(accentScale, 75, 75);

        var text = addText(comp, "TXT_TU_REVES", "TU RÊVES", [368, 650], 150, COLORS.ink);
        var textPos = text.property("ADBE Transform Group").property("ADBE Position");
        setKeys(textPos, [1.42, 1.90, 2.08], [[368, 736], [368, 650], [368, 660]]);
        easeKeys(textPos, 78, 78);
        var textOpacity = text.property("ADBE Transform Group").property("ADBE Opacity");
        setKeys(textOpacity, [1.42, 1.64], [0, 100]);
        easeKeys(textOpacity, 72, 72);

        var sub = addText(comp, "TXT_PROMPT", "Ton avenir commence par une vision.", [374, 740], 38, COLORS.teal);
        var subOpacity = sub.property("ADBE Transform Group").property("ADBE Opacity");
        setKeys(subOpacity, [2.05, 2.42], [0, 100]);
        easeKeys(subOpacity, 70, 70);
        var subPos = sub.property("ADBE Transform Group").property("ADBE Position");
        setKeys(subPos, [2.05, 2.42], [[374, 766], [374, 740]]);
        easeKeys(subPos, 70, 70);

        var markers = comp.layers.addNull(DURATION);
        markers.name = "MARKERS_VOICE_OVER";
        markers.guideLayer = true;
        addMarker(markers, 0.0, "SHOT START - calme, respiration");
        addMarker(markers, 1.05, "VO: Tu rêves");
        addMarker(markers, 2.10, "Respiration visuelle");
        addMarker(markers, 3.08, "Préparer transition fenêtre vers table");

        ctrl.moveToBeginning();
        markers.moveToBeginning();
        return comp;
    }

    function buildMaster(compFolder, shotComp) {
        var master = app.project.items.addComp("MASTER_1920x1080_V1", W, H, 1, DURATION, FPS);
        master.parentFolder = compFolder;
        master.bgColor = COLORS.bg;

        var shotLayer = master.layers.add(shotComp);
        shotLayer.name = "SHOT_01_DREAM";
        shotLayer.threeDLayer = true;

        var ctrl = master.layers.addNull(DURATION);
        ctrl.name = "CTRL_MASTER";
        ctrl.label = 10;
        ctrl.guideLayer = true;
        addSlider(ctrl, "Motion Intensity", 100);
        addSlider(ctrl, "Camera Depth", 125);
        addSlider(ctrl, "Parallax", 20);
        addSlider(ctrl, "Transition Speed", 100);

        var target = master.layers.addNull(DURATION);
        target.name = "NULL_CAMERA_TARGET";
        target.threeDLayer = true;
        target.property("ADBE Transform Group").property("ADBE Position").setValue([960, 540, 0]);
        target.guideLayer = true;

        var camera = master.layers.addCamera("CAM_MAIN", [960, 540]);
        camera.autoOrient = AutoOrientType.CAMERA_OR_POINT_OF_INTEREST;
        var camPos = camera.property("ADBE Transform Group").property("ADBE Position");
        setKeys(camPos, [0.0, 2.72, 3.2], [[960, 540, -1866], [960, 540, -1741], [960, 540, -1741]]);
        easeKeys(camPos, 68, 68);
        var cameraTransform = camera.property("ADBE Transform Group");
        var pointOfInterest = cameraTransform.property("ADBE Anchor Point");
        if (pointOfInterest === null) {
            pointOfInterest = cameraTransform.property("Point of Interest");
        }
        if (pointOfInterest !== null) {
            pointOfInterest.setValue([960, 540, 0]);
        }

        camera.moveToBeginning();
        target.moveToBeginning();
        ctrl.moveToBeginning();
        return master;
    }

    app.beginUndoGroup("Build SHOT 01 DREAM V1");
    try {
        if (!app.project) {
            app.newProject();
        }

        removeProjectItemByName("MASTER_1920x1080_V1");
        removeProjectItemByName("SHOT_01_DREAM_V1");

        var root = app.project.rootFolder;
        var projectFolder = findOrCreateFolder("LA_BOUSSOLE_MOTION", root);
        var compsFolder = findOrCreateFolder("01_COMPS", projectFolder);
        findOrCreateFolder("02_ASSETS", projectFolder);
        findOrCreateFolder("03_AUDIO", projectFolder);
        findOrCreateFolder("04_EXPORTS", projectFolder);

        var shot = buildShot(compsFolder);
        var master = buildMaster(compsFolder, shot);
        master.openInViewer();

        alert("SHOT_01_DREAM_V1 créé avec succès.\n\nOuvre MASTER_1920x1080_V1 pour prévisualiser le plan.");
    } catch (error) {
        fail("Échec de construction : " + error.toString() + "\nLigne : " + error.line);
    } finally {
        app.endUndoGroup();
    }
}());
