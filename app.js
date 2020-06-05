let tvPower = 'off';
let direction = 'north';
let plug = 'unplugged';
let hasRemote = false;
let hasKey = false;
let monkeys = 5;
let door = 'locked';
let tvMessage = '';
let bedMade = 'made';

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
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${westWall}</p>
                </div>  
            `);
		} else if (direction === 'west') {
			direction = 'south';
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${southWall}</p>
                </div>  
            `);
		} else if (direction === 'south') {
			direction = 'east';
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${eastWall}</p>
                </div>  
            `);
		} else {
			direction = 'north';
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${northWall}</p>
                </div>  
            `);
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
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${eastWall}</p>
                </div>  
            `);
		} else if (direction === 'west') {
			direction = 'north';
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${northWall}</p>
                </div>  
            `);
		} else if (direction === 'south') {
			direction = 'west';
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${westWall}</p>
                </div>  
            `);
		} else {
			direction = 'south';
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${southWall}</p>
                </div>  
            `);
		}
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
		$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${northWall}</p>
                </div>  
            `);
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
		$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${westWall}</p>
                </div>  
            `);
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
		$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${southWall}</p>
                </div>  
            `);
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
		$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>${eastWall}</p>
                </div>  
            `);
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
						tvMessage = `The tv is on. An alert flashes on the screen saying "It\'s behind the poster!"`;
						$('#storyZone').replaceWith(` 
                                <div id="storyZone">
                                    <p>${tvMessage}</p>
                                </div>  
                            `);
					} else {
						$('#storyZone').replaceWith(` 
                                <div id="storyZone">
                                    <p>It doesn't work. Maybe there's no power?</p>
                                </div>  
                            `);
					}
				} else {
					$('#storyZone').replaceWith(` 
                            <div id="storyZone">
                                <p>You need a device to turn it on</p>
                            </div>  
                        `);
				}
			} else {
				$('#storyZone').replaceWith(` 
                        <div id="storyZone">
                            <p>The tv is already on</p>
                        </div>  
                    `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no tv in view</p>
                </div>  
            `);
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
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>The tv is off</p>
                    </div>  
                `);
			} else {
				$('#storyZone').replaceWith(` 
                        <div id="storyZone">
                            <p>The tv is already off</p>
                        </div>  
                    `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no tv in view</p>
                </div>  
            `);
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
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You plug in the plug.</p>
                    </div>  
                `);
			} else {
				$('#storyZone').replaceWith(` 
                        <div id="storyZone">
                            <p>The plug is already plugged in.</p>
                        </div>  
                    `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no plug in view</p>
                </div>  
            `);
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
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You unplugged the tv, and the tv turns off.</p>
                    </div>  
                `);
			} else {
				$('#storyZone').replaceWith(` 
                        <div id="storyZone">
                            <p>The plug is already unplugged.</p>
                        </div>  
                    `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no plug in view</p>
                </div>  
            `);
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
			$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You look under the pillow and find nothing. Were you hoping for toothfairy money?</p>
                    </div>  
                `);
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no pillow in view</p>
                </div>  
            `);
		}
	} else if (
		/*=====================
            User checks pillow 
        ======================*/
		(userChoice.includes('look') || userChoice.includes('check')) &&
		userChoice.includes('pillow')
	) {
		if (direction == 'east') {
			$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>The pillow looks plush. Maybe it's goose-feathered.</p>
                    </div>  
                `);
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no pillow in view</p>
                </div>  
            `);
		}
	} else if (
		/*=====================
            User checks blanket 
        ======================*/
		(userChoice.includes('blanket') || userChoice.includes('sheets')) &&
		userChoice.includes('look')
	) {
		if (direction == 'east') {
			$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>Someone took a lot of time making this bed.</p>
                    </div>  
                `);
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no bed in view</p>
                </div>  
            `);
		}
	} else if (
		/*=====================
            User unmakes bed 
        ======================*/
		((userChoice.includes('remove') || userChoice.includes('mess')) &&
			(userChoice.includes('blankets') || userChoice.includes('blanket') || userChoice.includes('sheets'))) ||
		(userChoice.includes('unmake') && userChoice.includes('bed'))
	) {
		if (direction == 'east') {
			bedMade = 'unmade';
			$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>Someone somewhere is crying about the unmade bed.</p>
                    </div>  
                `);
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no bed in view</p>
                </div>  
            `);
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
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You try to restore it to its former glory but are unsuccessful.</p>
                    </div>  
                `);
			} else {
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>The bed is already made, and it's perfect. Please don't mess with it.</p>
                    </div>  
                `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no bed in view</p>
                </div>  
            `);
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
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>${monkeys} little monkeys jumping on the bed<br>
                        1 fell off and bumped his head<br>
                        Mama called the doctor,<br>
                        And the doctor said<br>
                        No more monkeys jumping on the bed</p>
                    </div>  
                `);
				monkeys--;
			} else {
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>NO MORE MONKEYS JUMPING ON THE BED!!!</p>
                    </div>  
                `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no bed in view</p>
                </div>  
            `);
		}
	} else if (
		/*=====================
            User lies on bed  
        ======================*/

		((userChoice.includes('lay') || userChoice.includes('lie')) && userChoice.includes('bed')) ||
		userChoice.includes('sleep')
	) {
		if (direction == 'east') {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>No time to relax!</p>
                </div>  
            `);
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no bed in view</p>
                </div>  
            `);
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
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>There's nothing else under the bed.</p>
                    </div>  
                `);
			} else {
				hasRemote = true;
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You find a remote and pick it up!</p>
                    </div>  
                `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no bed in view</p>
                </div>  
            `);
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
				hasKey = true;
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You remove the poster from the wall and find a key behind it!</p>
                    </div>  
                `);
			} else {
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>No need to further mess with the poster.</p>
                    </div>  
                `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no poster in view</p>
                </div>  
            `);
		}
	} else if (
		/*=====================
            User unlocks door 
        ======================*/

		userChoice.includes('unlock') &&
		userChoice.includes('door')
	) {
		if (direction == 'south') {
			if (hasKey == true) {
				door = 'unlocked';
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You unlock the door.</p>
                    </div>  
                `);
			} else {
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You need a key to do that.</p>
                    </div>  
                `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no door in view</p>
                </div>  
            `);
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
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>You open the door and escape the room!!! Congrats!</p>
                    </div>  
                `);
				$('#inputZone').replaceWith(` 
                    <form id="inputZone">
                    </form>
                `);
			} else {
				$('#storyZone').replaceWith(` 
                    <div id="storyZone">
                        <p>The door is locked.</p>
                    </div>  
                `);
			}
		} else {
			$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>There's no door in view</p>
                </div>  
            `);
		}
	} else {
		// user inputs something not accounted for
		$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p>I don't understand what you want from me.</p>
                </div>  
            `);
	}
}

/*
look behind || turn around



*/
