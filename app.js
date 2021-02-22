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
let achievementCount = 0;
let achievementMonkeys = false;
let achievementMessupBed = false;
let achievementFixBed = false;
let achievementUnplug = false;
let achievementKicks = false;

let northWall = `You are facing north. A TV is in front of you and it is ${tvPower}. ${tvMessage}`;
let westWall = `You are facing west. A poster hanging on the wall says "Don\'t look under the bed!!"`;
let eastWall = `You are facing east. A well-made bed is in front of you. Really well-made. Like military precision.`;
let southWall = `You are facing south. There is a door with a deadbolt.`;

// User submits choice of action
$('main').on('click', '#actionBtn', function() {
	event.preventDefault();
	let userChoice = $('#actionInput').val();
	$('#actionInput').val('');
	userChoice = userChoice.replace(/[.,\/#!$%\^&\*;@:{}=\-_`~()]/g, '');
	userChoice = userChoice.toLowerCase().split(' ');
	interpretString(userChoice);
});


function setPrior() {
	priorMessage = currentMessage;
	$('#priorZone').html(`<p>${priorMessage}</p>`);
}

function setCurrent(displayText) {
	$('#storyText').text(`${displayText}`);
	currentMessage = displayText;
}

function interpretString(userChoice) {
	setPrior();
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
			setCurrent(westWall);
		} else if (direction === 'west') {
			direction = 'south';			
			setCurrent(southWall);
		} else if (direction === 'south') {
			direction = 'east';			
			setCurrent(eastWall);
		} else {
			direction = 'north';			
			setCurrent(northWall);
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
			setCurrent(eastWall);
		} else if (direction === 'west') {
			direction = 'north';			
			setCurrent(northWall);
		} else if (direction === 'south') {
			direction = 'west';			
			setCurrent(westWall);
		} else {
			direction = 'south';			
			setCurrent(southWall);
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
			setCurrent(southWall);
		} else if (direction === 'west') {
			direction = 'east';			
			setCurrent(eastWall);
		} else if (direction === 'south') {
			direction = 'north';			
			setCurrent(northWall);
		} else {
			direction = 'west';			
			setCurrent(westWall);
		}
	} else if (
		/*=====================
            User looks up
        ======================*/
		(userChoice.includes('cieling') || userChoice.includes('ceiling') || userChoice.includes('up')) &&
		userChoice.includes('look')
	) {		
		setCurrent("You look up at the ceiling. There's a light, but there's nothing special about it.");
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
		if (achievementKicks == false) {
			achievementKicks = true;
			achievementCount++;
			$('#achievement-count').text(achievementCount);
			$('#achievement-kicks').removeClass('hidden');
		}
		setCurrent('You look down at the floor. Nice shoes!');
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
		setCurrent(northWall);
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
		setCurrent(westWall);
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
		setCurrent(southWall);
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
		setCurrent(eastWall);
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
						tvMessage = `An alert flashes on the screen saying "It\'s behind the poster! Use the code 371"`;
						northWall = `You are facing north. A TV is in front of you and it is ${tvPower}. ${tvMessage}`;						
						setCurrent(tvMessage);
					} else {						
						setCurrent("It doesn't work. Maybe there's no power?");
					}
				} else {					
					setCurrent('You need a device to turn it on.');
				}
			} else {				
				setCurrent('The tv is already on.');
			}
		} else {			
			setCurrent(`There's no tv in view.`);
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
				setCurrent(`The tv is off.`);
			} else {				
				setCurrent(`The tv is already off.`);
			}
		} else {			
			setCurrent(`There's no tv in view.`);
		}
	} else if (
		/*=====================
            User looks behind tv
        ======================*/
		userChoice.includes('behind') &&
		(userChoice.includes('tv') || userChoice.includes('television'))
	) {
		if (direction == 'north') {
			if (plug == 'unplugged') {				
				setCurrent(`You see a plug behind the tv that's not in an outlet.`);
			} else {				
				setCurrent(`You see a plug already in an outlet.`);
			}
		} else {			
			setCurrent(`There's no tv in view.`);
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
				setCurrent(`You plug in the plug.`);
			} else {				
				setCurrent(`The plug is already plugged in.`);
			}
		} else {			
			setCurrent(`There's no plug in view.`);
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
				if (achievementUnplug == false) {
					achievementUnplug = true;
					achievementCount++;
					$('#achievement-count').text(achievementCount);
					$('#achievement-unplug').removeClass('hidden');
				}
				setCurrent(`You unplugged the tv.`);
			} else {				
				setCurrent(`The plug is already unplugged.`);
			}
		} else {			
			setCurrent(`There's no plug in view.`);
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
			setCurrent(`You look under the pillow and find nothing. Were you hoping for toothfairy money?`);
		} else {			
			setCurrent(`There's no pillow in view.`);
		}
	} else if (
		/*=====================
            User checks pillow 
        ======================*/
		(userChoice.includes('look') || userChoice.includes('check')) &&
		userChoice.includes('pillow')
	) {
		if (direction == 'east') {			
			setCurrent(`The pillow looks plush. Maybe it's goose-feathered.`);
		} else {			
			setCurrent(`There's no pillow in view.`);
		}
	} else if (
		/*=====================
            User checks blanket 
        ======================*/
		(userChoice.includes('blanket') || userChoice.includes('sheets')) &&
		userChoice.includes('look')
	) {
		if (direction == 'east') {			
			setCurrent(`Someone took a lot of time making this bed.`);
		} else {			
			setCurrent(`There's no bed in view.`);
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
			if (achievementMessupBed == false) {
				achievementMessupBed = true;
				achievementCount++;
				$('#achievement-count').text(achievementCount);
				$('#achievement-messup-bed').removeClass('hidden');
			}
			eastWall = `You are facing east. A bed that used to be perfectly made is now entirely disheveled. `;
			setCurrent(`Someone somewhere is crying about the unmade bed.`);
		} else {			
			setCurrent(`There's no bed in view.`);
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
				if (achievementFixBed == false) {
					achievementFixBed = true;
					achievementCount++;
					$('#achievement-count').text(achievementCount);
					$('#achievement-fix-bed').removeClass('hidden');
				}
				setCurrent(`You try to restore it to its former glory but are unsuccessful.`);
			} else {				
				setCurrent(`The bed is already made, and it's perfect. Please don't mess with it.`);
			}
		} else {			
			setCurrent(`There's no bed in view.`);
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
				setCurrent(`${monkeys} little monkeys jumping on the bed<br>
                1 fell off and bumped his head<br>
                Mama called the doctor,<br>
                And the doctor said<br>
                No more monkeys jumping on the bed`);
				monkeys--;
			} else {				
				if (achievementMonkeys == false) {
					achievementMonkeys = true;
					achievementCount++;
					$('#achievement-count').text(achievementCount);
					$('#achievement-monkeys').removeClass('hidden');
				}
				setCurrent(`NO MORE MONKEYS JUMPING ON THE BED!!!`);
			}
		} else {			
			setCurrent(`There's no bed in view.`);
		}
	} else if (
		/*=====================
            User lies on bed  
        ======================*/
		((userChoice.includes('lay') || userChoice.includes('lie')) && userChoice.includes('bed')) ||
		userChoice.includes('sleep')
	) {
		if (direction == 'east') {			
			setCurrent(`No time to relax!`);
		} else {			
			setCurrent(`There's no bed in view.`);
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
				setCurrent(`There's nothing else under the bed.`);
			} else {
				hasRemote = true;				
				setCurrent(`You find a remote and pick it up!`);
			}
		} else {			
			setCurrent(`There's no bed in view.`);
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
				setCurrent(`You remove the poster from the wall and find a hole behind it! In the hole is a lockbox. You take the lockbox.`);
			} else {				
				setCurrent(`No need to further mess with the poster.`);
			}
		} else {			
			setCurrent(`There's no poster in view.`);
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
			setCurrent(`There's a 3-digit combination set to 000.`);
		} else {			
			setCurrent(`There's no lockbox in view.`);
		}
	} else if (
		/*=====================
            User tries lockbox combo
        ======================*/
		(userChoice.includes('try') ||
			userChoice.includes('enter') ||
			userChoice.includes('code') ||
			userChoice.includes('set') ||
			userChoice.includes('check')) &&
		hasBox == true &&
		/\d/.test(userChoice)
	) {
		if (userChoice.includes('371')) {
			hasKey = true;			
			setCurrent(`The box opens up revealing a key. You take the key.`);
		} else {			
			setCurrent(`That doesn't seem to be the correct combination.`);
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
				setCurrent(`You unlock the door.`);
			} else {				
				setCurrent(`You need a key to do that.`);
			}
		} else {			
			setCurrent(`There's no door in view.`);
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
				setCurrent(`You open the door and escape the room!!! Congrats!`);
				$('#inputZone').replaceWith(` 
                    <form id="inputZone">
                    </form>
                `);
				$('#priorZone').replaceWith(` 
                    <form id="inputZone">
                    </form>
                `);
			} else {				
				setCurrent(`The door is locked.`);
			}
		} else {			
			setCurrent(`There's no door in view.`);
		}
	} else {
		// user inputs something not accounted for		
		$('#storyZone').replaceWith(` 
                <div id="storyZone">
                    <p id="storyText">I don't understand what you want from me. Try inputting something else.</p>
                </div>  
            `);
	}
}
