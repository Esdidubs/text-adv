let tvPower = 'off';
let direction = 'north';
let plug = 'unplugged';
let hasRemote = false;
let hasKey = false;
let monkeys = 5;
let door = 'locked';
let tvMessage = '';
let bedMade = 'made';
let priorMessage = '';
let currentMessage =
	'You are standing in a room facing north. A TV is in front of you. You have a strong urge to escape the room. What do you do?';
let hasBox = false;
let displayText = '';

let northWall = `You are facing north. A TV is in front of you and it is ${tvPower}. ${tvMessage}`;
let westWall = `You are facing west. A poster hanging on the wall says "Don\'t look under the bed!!"`;
let eastWall = `You are facing east. A well-made bed is in front of you. Really well-made. Like military precision.`;
let southWall = `You are facing south. There is a door with a deadbolt.`;

$(function() {
	buttons();
});

function buttons() {
	$('main').on('click', '#actionBtn', function() {
		event.preventDefault();
		let userChoice = $('#actionInput').val();
		$('#actionInput').val('');
		userChoice = userChoice.replace(/[.,\/#!$%\^&\*;@:{}=\-_`~()]/g, '');
		userChoice = userChoice.toLowerCase().split(' ');
		interpretString(userChoice);
	});
}

function setPrior() {
	priorMessage = currentMessage;
	$('#priorZone').replaceWith(` 
            <div id="priorZone">
                <p>${priorMessage}</p>
            </div>  
        `);
}

function setCurrent() {
	$('#storyZone').replaceWith(` 
        <div id="storyZone">
            <p id="storyText">${displayText}</p>
        </div>  
    `);
	currentMessage = displayText;
}

function interpretString(userChoice) {
	if (
		/*=====================
            User looks left
        ======================*/

		(userChoice.includes('look') ||
			userChoice.includes('go') ||
			userChoice.includes('turn') ||
			userChoice.includes('face')) &&
		userChoice.includes('left')
	) {
		if (direction === 'north') {
			direction = 'west';
			setPrior();
			displayText = westWall;
			setCurrent();
		} else if (direction === 'west') {
			direction = 'south';
			setPrior();
			displayText = southWall;
			setCurrent();
		} else if (direction === 'south') {
			direction = 'east';
			setPrior();
			displayText = eastWall;
			setCurrent();
		} else {
			direction = 'north';
			setPrior();
			displayText = northWall;
			setCurrent();
		}
	} else if (
		/*=====================
            User looks right
        ======================*/
		(userChoice.includes('look') ||
			userChoice.includes('go') ||
			userChoice.includes('turn') ||
			userChoice.includes('face')) &&
		userChoice.includes('right')
	) {
		if (direction === 'north') {
			direction = 'east';
			setPrior();
			displayText = eastWall;
			setCurrent();
		} else if (direction === 'west') {
			direction = 'north';
			setPrior();
			displayText = northWall;
			setCurrent();
		} else if (direction === 'south') {
			direction = 'west';
			setPrior();
			displayText = westWall;
			setCurrent();
		} else {
			direction = 'south';
			setPrior();
			displayText = southWall;
			setCurrent();
		}
	} else if (
		/*=====================
            User looks behind
        ======================*/
		userChoice.includes('turn') &&
		userChoice.includes('around')
	) {
		if (direction === 'north') {
			direction = 'south';
			setPrior();
			displayText = southWall;
			setCurrent();
		} else if (direction === 'west') {
			direction = 'east';
			setPrior();
			displayText = eastWall;
			setCurrent();
		} else if (direction === 'south') {
			direction = 'north';
			setPrior();
			displayText = northWall;
			setCurrent();
		} else {
			direction = 'west';
			setPrior();
			displayText = westWall;
			setCurrent();
		}
	} else if (
		/*=====================
            User looks up
        ======================*/
		(userChoice.includes('cieling') || userChoice.includes('ceiling') || userChoice.includes('up')) &&
		userChoice.includes('look')
	) {
		setPrior();
		displayText = "You look up at the ceiling. There's a light, but there's nothing special about it.";
		setCurrent();
	} else if (
		/*=====================
            User looks down
        ======================*/
		(userChoice.includes('floor') ||
			userChoice.includes('ground') ||
			userChoice.includes('down') ||
			userChoice.includes('feet')) &&
		userChoice.includes('look')
	) {
		setPrior();
		displayText = 'You look down at the floor. Nice shoes!';
		setCurrent();
	} else if (
		/*=====================
            User looks north
        ======================*/
		(userChoice.includes('look') ||
			userChoice.includes('go') ||
			userChoice.includes('turn') ||
			userChoice.includes('face')) &&
		userChoice.includes('north')
	) {
		direction = 'north';
		setPrior();
		displayText = northWall;
		setCurrent();
	} else if (
		/*=====================
            User looks west
        ======================*/
		(userChoice.includes('look') ||
			userChoice.includes('go') ||
			userChoice.includes('turn') ||
			userChoice.includes('face')) &&
		userChoice.includes('west')
	) {
		direction = 'west';
		setPrior();
		displayText = westWall;
		setCurrent();
	} else if (
		/*=====================
            User looks south
        ======================*/
		(userChoice.includes('look') ||
			userChoice.includes('go') ||
			userChoice.includes('turn') ||
			userChoice.includes('face')) &&
		userChoice.includes('south')
	) {
		direction = 'south';
		setPrior();
		displayText = southWall;
		setCurrent();
	} else if (
		/*=====================
            User looks east
        ======================*/
		(userChoice.includes('look') ||
			userChoice.includes('go') ||
			userChoice.includes('turn') ||
			userChoice.includes('face')) &&
		userChoice.includes('east')
	) {
		direction = 'east';
		setPrior();
		displayText = eastWall;
		setCurrent();
	} else if (
		/*=====================
            User turns on tv
        ======================*/
		userChoice.includes('turn') &&
		userChoice.includes('on') &&
		(userChoice.includes('tv') || userChoice.includes('television'))
	) {
		if (direction == 'north') {
			if (tvPower == 'off') {
				if (hasRemote) {
					if (plug == 'plugged') {
						tvPower = 'on';
						tvMessage = `The tv is on. An alert flashes on the screen saying "It\'s behind the poster! Use the code 371"`;
						setPrior();
						displayText = tvMessage;
						setCurrent();
					} else {
						setPrior();
						displayText = "It doesn't work. Maybe there's no power?";
						setCurrent();
					}
				} else {
					setPrior();
					displayText = 'You need a device to turn it on.';
					setCurrent();
				}
			} else {
				setPrior();
				displayText = 'The tv is already on.';
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no tv in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User turns off tv
        ======================*/
		userChoice.includes('turn') &&
		userChoice.includes('off') &&
		(userChoice.includes('tv') || userChoice.includes('television'))
	) {
		if (direction == 'north') {
			if (tvPower == 'on') {
				tvPower = 'off';
				setPrior();
				displayText = `The tv is off.`;
				setCurrent();
			} else {
				setPrior();
				displayText = `The tv is already off.`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no tv in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User plugs in TV
        ======================*/
		userChoice.includes('plug') &&
		userChoice.includes('in')
	) {
		if (direction == 'north') {
			if (plug == 'unplugged') {
				plug = 'plugged';
				setPrior();
				displayText = `You plug in the plug.`;
				setCurrent();
			} else {
				setPrior();
				displayText = `The plug is already plugged in.`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no plug in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User unplugs TV
        ======================*/
		userChoice.includes('unplug')
	) {
		if (direction == 'north') {
			if (plug == 'plugged') {
				plug = 'unplugged';
				tvPower = 'off';
				setPrior();
				displayText = `You unplugged the tv, and the tv turns off.`;
				setCurrent();
			} else {
				setPrior();
				displayText = `The plug is already unplugged.`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no plug in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User checks under pillow 
        ======================*/
		(userChoice.includes('look') || userChoice.includes('check')) &&
		(userChoice.includes('under') || userChoice.includes('beneath')) &&
		userChoice.includes('pillow')
	) {
		if (direction == 'east') {
			setPrior();
			displayText = `You look under the pillow and find nothing. Were you hoping for toothfairy money?`;
			setCurrent();
		} else {
			setPrior();
			displayText = `There's no pillow in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User checks pillow 
        ======================*/
		(userChoice.includes('look') || userChoice.includes('check')) &&
		userChoice.includes('pillow')
	) {
		if (direction == 'east') {
			setPrior();
			displayText = `The pillow looks plush. Maybe it's goose-feathered.`;
			setCurrent();
		} else {
			setPrior();
			displayText = `There's no pillow in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User checks blanket 
        ======================*/
		(userChoice.includes('blanket') || userChoice.includes('sheets')) &&
		userChoice.includes('look')
	) {
		if (direction == 'east') {
			setPrior();
			displayText = `Someone took a lot of time making this bed.`;
			setCurrent();
		} else {
			setPrior();
			displayText = `There's no bed in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User unmakes bed 
        ======================*/
		((userChoice.includes('remove') || userChoice.includes('mess')) &&
			(userChoice.includes('blankets') ||
				userChoice.includes('bed') ||
				userChoice.includes('blanket') ||
				userChoice.includes('sheets'))) ||
		(userChoice.includes('unmake') && userChoice.includes('bed'))
	) {
		if (direction == 'east') {
			bedMade = 'unmade';
			setPrior();
			displayText = `Someone somewhere is crying about the unmade bed.`;
			setCurrent();
		} else {
			setPrior();
			displayText = `There's no bed in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User makes bed 
        ======================*/

		(userChoice.includes('make') || userChoice.includes('fix')) &&
		userChoice.includes('bed')
	) {
		if (direction == 'east') {
			if (bedMade == 'unmade') {
				setPrior();
				displayText = `You try to restore it to its former glory but are unsuccessful.`;
				setCurrent();
			} else {
				setPrior();
				displayText = `The bed is already made, and it's perfect. Please don't mess with it.`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no bed in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User jumps on bed 
        ======================*/

		userChoice.includes('jump') &&
		userChoice.includes('bed')
	) {
		if (direction == 'east') {
			if (monkeys > 0) {
				setPrior();
				displayText = `${monkeys} little monkeys jumping on the bed<br>
                1 fell off and bumped his head<br>
                Mama called the doctor,<br>
                And the doctor said<br>
                No more monkeys jumping on the bed`;
				setCurrent();
				monkeys--;
			} else {
				setPrior();
				displayText = `NO MORE MONKEYS JUMPING ON THE BED!!!`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no bed in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User lies on bed  
        ======================*/

		((userChoice.includes('lay') || userChoice.includes('lie')) && userChoice.includes('bed')) ||
		userChoice.includes('sleep')
	) {
		if (direction == 'east') {
			setPrior();
			displayText = `No time to relax!`;
			setCurrent();
		} else {
			setPrior();
			displayText = `There's no bed in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User looks under bed
        ======================*/

		userChoice.includes('under') &&
		userChoice.includes('bed')
	) {
		if (direction == 'east') {
			if (hasRemote == true) {
				setPrior();
				displayText = `There's nothing else under the bed.`;
				setCurrent();
			} else {
				hasRemote = true;
				setPrior();
				displayText = `You find a remote and pick it up!`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no bed in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User looks behind poster
        ======================*/

		(userChoice.includes('rip') ||
			userChoice.includes('remove') ||
			userChoice.includes('take') ||
			userChoice.includes('pull') ||
			userChoice.includes('behind')) &&
		userChoice.includes('poster')
	) {
		if (direction == 'west') {
			if (hasKey == false) {
				hasBox = true;
				westWall = `You are facing west. A poster used to hang on the wall that said "Don\'t look under the bed!!". Now there's a hole in the wall that's empty.`;
				setPrior();
				displayText = `You remove the poster from the wall and find a hole behind it! In the hole is a lockbox. You take the lockbox.`;
				setCurrent();
			} else {
				setPrior();
				displayText = `No need to further mess with the poster.`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no poster in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User looks at lockbox
        ======================*/

		(userChoice.includes('look') ||
			userChoice.includes('inspect') ||
			userChoice.includes('view') ||
			userChoice.includes('check')) &&
		(userChoice.includes('lockbox') || userChoice.includes('box'))
	) {
		if (hasBox == true) {
			setPrior();
			displayText = `There's a 3-digit combination set to 000.`;
			setCurrent();
		} else {
			setPrior();
			displayText = `There's no lockbox in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User tries lockbox combo
        ======================*/

		(userChoice.includes('try') ||
			userChoice.includes('enter') ||
			userChoice.includes('view') ||
			userChoice.includes('check')) &&
		hasBox == true &&
		/\d/.test(userChoice)
	) {
		if (userChoice.includes('371')) {
			hasKey = true;
			setPrior();
			displayText = `The box opens up revealing a key. You take the key.`;
			setCurrent();
		} else {
			setPrior();
			displayText = `That doesn't seem to be the correct combination.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User unlocks door 
        ======================*/

		(userChoice.includes('unlock') || userChoice.includes('key')) &&
		userChoice.includes('door')
	) {
		if (direction == 'south') {
			if (hasKey == true) {
				door = 'unlocked';
				setPrior();
				displayText = `You unlock the door.`;
				setCurrent();
			} else {
				setPrior();
				displayText = `You need a key to do that.`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no door in view.`;
			setCurrent();
		}
	} else if (
		/*=====================
            User opens door  
        ======================*/

		userChoice.includes('open') &&
		userChoice.includes('door')
	) {
		if (direction == 'south') {
			if (door == 'unlocked') {
				setPrior();
				displayText = `You open the door and escape the room!!! Congrats!`;
				setCurrent();
				$('#inputZone').replaceWith(` 
                    <form id="inputZone">
                    </form>
                `);
			} else {
				setPrior();
				displayText = `The door is locked.`;
				setCurrent();
			}
		} else {
			setPrior();
			displayText = `There's no door in view.`;
			setCurrent();
		}
	} else {
		// user inputs something not accounted for
		setPrior();
		$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p id="storyText">I don't understand what you want from me. Try inputting something else.</p>
                </div>  
            `);
	}
}
