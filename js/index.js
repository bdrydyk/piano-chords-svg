(function() {

	var linksChords, links, linksMap, sharp, minor, rootSharp, checksVariations, variations, chordDisplay, chordName, svg, btZoomOut, btZoomIn, zoomSlider;

// // // // // // // // // // // // // // // // // // // // // // // // //

	function loadChord(hash) {
		var chord = hash.substring(1);
		chordName.innerText = chord;
		//
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			link.setAttribute('class', '');
		}
		var root = chord.substring(0, 1);
		linksMap[root].setAttribute('class', 'current');
		//
		var notes = svg.getElementsByTagName('circle');
		for (var j = 0 ; j < notes.length ; j++) {
			var note = notes[j];
			svg.removeChild(note);
			j--;
		}
		//
		if (chord.indexOf('#') > 0) {
			sharp.checked = true;
			sharp.parentNode.parentNode.setAttribute('class', 'current');
		} else {
			sharp.checked = false;
			sharp.parentNode.parentNode.setAttribute('class', '');
		}
		if (chord.indexOf('m') > 0) {
			minor.checked = true;
			minor.parentNode.parentNode.setAttribute('class', 'current');
		} else {
			minor.checked = false;
			minor.parentNode.parentNode.setAttribute('class', '');
		}
		//
		var keys = CHORDS[chord];
		if (keys) {
			for (var k = 0 ; k < keys.length ; k++) {
				var key = keys[k];
				var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				circle.setAttribute('r', '5');
				if (key > 0) {
					circle.setAttribute('name', 'w');
					circle.setAttribute('cx', 18 + 21 * (key - 1));
					circle.setAttribute('cy', 92);
					circle.setAttribute('stroke', '#000');
					circle.setAttribute('fill', '#FFF');
				} else if (key < 0) {
					circle.setAttribute('name', 'b');
					circle.setAttribute('cx', 7 + 21 * (-key - 1));
					circle.setAttribute('cy', 66);
					circle.setAttribute('stroke', '#FFF');
					circle.setAttribute('fill', '#444');
				}
				svg.appendChild(circle);
			}
		}
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals(event) {
		linksChords = Utils.$('links-chords');
		links = linksChords.getElementsByTagName('a');
		linksMap = [];
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			linksMap[link.innerText] = link;
		}
		sharp = Utils.$('sharp');
		minor = Utils.$('minor');
		rootSharp = Utils.$('root-sharp');
		checksVariations = Utils.$('checks-variations');
		variations = checksVariations.querySelectorAll('input[type=checkbox]');
		chordDisplay = Utils.$('chord-display');
		chordName = Utils.$('chord-name');
		svg = Utils.$('svg');
		btZoomOut = Utils.$('bt-zoom-out');
		btZoomIn = Utils.$('bt-zoom-in');
		zoomSlider = Utils.$('zoom-slider');
	}

	function initChecks(event) {
		sharp.addEventListener('click', modifiers_Click);
		minor.addEventListener('click', modifiers_Click);
	}

	function initZoom(event) {
		btZoomOut.addEventListener('click', btZoomOut_Click);
		btZoomIn.addEventListener('click', btZoomIn_Click);
		zoomSlider.addEventListener('input', zoomSlider_Input);
		zoomSlider_Input(event);
	}

	function initHash(event) {
		var hash = document.location.hash;
		if (hash) {
			loadChord(hash);
		} else {
			document.location.hash = 'Cm';
		}
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function zoomSlider_Input(event) {
		chordDisplay.style.zoom = zoomSlider.value + '%';
	}

	function modifiers_Click(event) {
		var isSharp = sharp.checked;
		var isMinor = minor.checked;
		var modifiers = isSharp ? '#' : '';
		modifiers += isMinor ? 'm' : '';
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			link.href = '#' + link.innerText + modifiers;
		}
		sharp.parentNode.parentNode.setAttribute('class', isSharp ? 'current' : '');
		minor.parentNode.parentNode.setAttribute('class', isMinor ? 'current' : '');
		for (var i = 0 ; i < links.length ; i++) {
			var link = links[i];
			if (link.getAttribute('class') == 'current') {
				document.location.hash = link.getAttribute('href').substring(1);
				break;
			}
		}
	}

	function btZoomOut_Click(event) {
		zoomSlider.value = zoomSlider.value * 1 - 10;
		zoomSlider_Input(event);
	}

	function btZoomIn_Click(event) {
		zoomSlider.value = zoomSlider.value * 1 + 10;
		zoomSlider_Input(event);
	}

	function window_HashChange(event) {
		var hash = document.location.hash;
		loadChord(hash);
	}

	function window_Load(event) {
		initGlobals(event);
		initChecks(event);
		initZoom(event);
		initHash(event);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	window.addEventListener('load', window_Load);
	window.addEventListener('hashchange', window_HashChange);

})();