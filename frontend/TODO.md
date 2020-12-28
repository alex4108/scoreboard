# Frontend TODO

## Scoreboards

### List
* When I list scoreboards, I should be presented a button to add a new one
* When I list scoreboards, I should default to filter only active games
* When I click on a scoreboard from the list, I should open to the Scoreboard single view

### Add/Edit
* When adding or editing a scoreboard, I should be able to set the Name and Players
* Closed games should not be editable
* Started games cannot add or remove players

### Single View
* When in a single scoreboard view, I should be shown the players and their points
* A "live view" toggle, if the game is open

### Ref View
* I should be able to add/subtract points from a player
* If the game isn't opened yet, I should have a button to Open game
* If the game is open, I should have a button to "Close game"
* "Close Game" should have a confirmation screen

### Live View
Live View will be a wallboard type view for the game's status
It'll show points added or lost as an event history
It'll show the players and their score, sorted by points descending
It'll refresh the state every second for "live"ness
If the game closes, live view will toggle off

## Players

Players cannot be removed once added, and their names are finalized.

### List
* If I click a player from the list, I should be able to go to Single Player View

### Single View
* Should show me match history for this player

