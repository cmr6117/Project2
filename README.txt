What your site does and what its purpose.

	My site is a quiz game where you guess the artist associated with a song. There was something similar when I went to a baseball game when I was younger and I remembered it being fun so I decided to make my own spin on the concept.

How can this app be profitable? What profit model (ads, service, microtransactions, etc) are you considering?

	The app is designed around having banner ads on each side of the main game window. There are currently placeholders there to give a vague idea about how it would work.

How are you using React? What is it being used to show?

	My app has a lot of constantly changing pieces so React ended up being very useful. I used it to render:
	-The "About" div on the login page
	-The quizzes themselves
	-The recovery screen in between each quiz
	-The quiz timer
	-The pause button, which needed to say whether the button would pause or resume the game
	-A log of prior quizzes
	-The banner ad placeholder

How you used MVC and which framework you used

	My app had a lot of information that frequently needed to be sent back and forth between the server and the client and MVC was extremely useful in facilitating that. I used Express.

What you used Mongo for (what did you store/retrieve)

	Alongside the basic account system, I used Mongo to store a log of prior quizzes.

How you used a templating language and which templating language you used

	I used DomoMaker E as my base and didn't end up changing Handlebars as my templating language. My main use for it was confinining my entire app to only two pages in order to make everything feel more seamless.

How did you go above and beyond

	-I made the game look as visually appealing as I could.
	-Nothing just loads onto the page. Everything is animated when starting up, idling, or switching to another page.
	-The game keeps a log of all of the quizzes you took. It is displayed while the game is paused.