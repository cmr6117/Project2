//Music  Data
const artists = [
   {
      "quiz":"Weird Al Yankovic",
      "songs":[
         "Dare To Be Stupid",
         "White & Nerdy",
         "Amish Paradise",
         "Party In The CIA",
         "Word Crimes",
         "Eat It",
         "Smells Like Nirvana",
         "Albuquerque",
         "Wanna B Ur Lovr"
      ]
   },
   {
      "quiz":"a-ha",
      "songs":[
         "Take On Me"
      ]
   },
   {
      "quiz":"ABBA",
      "songs":[
         "Dancing Queen",
         "Mamma Mia"
      ]
   },
   {
      "quiz":"AC/DC",
      "songs":[
         "Back In Black",
         "Ballbreaker",
         "Dirty Deeds Done Dirt",
         "T.N.T.",
         "High Voltage",
         "Highway to Hell",
         "You Shook Me All Night Long",
         "Thunderstruck",
         "Hells Bells"
      ]
   },
   {
      "quiz":"Adele",
      "songs":[
         "Rolling in the Deep",
         "Set Fire to the Rain"
      ]
   },
   {
      "quiz":"Aerosmith",
      "songs":[
         "Dude (Looks Like A Lady)",
         "Walk This Way"
      ]
   },
   {
      "quiz":"Billy Joel",
      "songs":[
         "Uptown Girl",
         "Piano Man",
         "We Didn't Start The Fire"
      ]
   },
   {
      "quiz":"Bob Dylan",
      "songs":[
         "Knockin' On Heaven's Door",
         "Blowin' In The Wind"
      ]
   },
   {
      "quiz":"Bon Jovi",
      "songs":[
         "Who Says You Can't Go Home",
         "Wanted Dead Or Alive",
         "It's My Life",
         "You Give Love A Bad Name",
         "Livin' On A Prayer",
         "Bad Medicine"
      ]
   },
   {
      "quiz":"Bonnie Tyler",
      "songs":[
         "Holding Out For A Hero"
      ]
   },
   {
      "quiz":"Bruce Springsteen",
      "songs":[
         "Dancing In the Dark",
         "Born in the U.S.A."
      ]
   },
   {
      "quiz":"Bryan Adams",
      "songs":[
         "Summer Of '69"
      ]
   },
   {
      "quiz":"David Bowie",
      "songs":[
         "Scary Monsters (And Super Creeps)",
         "Heroes",
         "Rebel Rebel",
         "Space Oddity",
         "Starman",
         "Life On Mars?"
      ]
   },
   {
      "quiz":"Deep Purple",
      "songs":[
         "Highway Star",
         "Smoke On The Water",
         "Speed King"
      ]
   },
   {
      "quiz":"Def Leppard",
      "songs":[
         "Pour Some Sugar On Me",
         "Rock Of Ages"
      ]
   },
   {
      "quiz":"Dio",
      "songs":[
         "Holy Diver",
         "Rainbow In The Dark"
      ]
   },
   {
      "quiz":"Dire Straits",
      "songs":[
         "Sultans Of Swing"
      ]
   },
   {
      "quiz":"Dolly Parton",
      "songs":[
         "9 to 5",
         "Jolene"
      ]
   },
   {
      "quiz":"Don McLean",
      "songs":[
         "American Pie"
      ]
   },
   {
      "quiz":"Earth, Wind, & Fire",
      "songs":[
         "September",
         "Boogie Wonderland"
      ]
   },
   {
      "quiz":"Electric Light Orchestra",
      "songs":[
         "Mr. Blue Sky"
      ]
   },
   {
      "quiz":"Elton John",
      "songs":[
         "Rocket Man",
         "Don't Go Breaking My Heart"
      ]
   },
   {
      "quiz":"Elvis Presley",
      "songs":[
         "The Wonder Of You",
         "King Creole",
         "Can't Help Falling In Love",
         "Jailhouse Rock",
         "Suspicious Minds",
         "Blue Christmas",
         "Hound Dog",
         "Blue Hawaii",
         "Heartbreak Hotel",
         "Burning Love"
      ]
   },
   {
      "quiz":"Fleetwood Mac",
      "songs":[
         "The Chain",
         "Monday Morning",
         "Dreams",
         "Tusk",
         "Landslide",
         "Go Your Own Way"
      ]
   },
   {
      "quiz":"Green Day",
      "songs":[
         "Basket Case",
         "American Idiot",
         "Wake Me Up When September Ends",
         "Holiday",
         "21 Guns",
         "Jesus Of Suburbia",
         "Welcome To Paradise"
      ]
   },
   {
      "quiz":"Hanson",
      "songs":[
         "MMBop"
      ]
   },
   {
      "quiz":"Jamiroquai",
      "songs":[
         "Virtual Insanity"
      ]
   },
   {
      "quiz":"John Denver",
      "songs":[
         "Take Me Home, Country Roads"
      ]
   },
   {
      "quiz":"Journey",
      "songs":[
         "Don't Stop Believin'",
         "Any Way You Want It"
      ]
   },
   {
      "quiz":"Kansas",
      "songs":[
         "Carry on Wayward Son"
      ]
   },
   {
      "quiz":"Katrina & The Waves",
      "songs":[
         "Walking On Sunshine"
      ]
   },
   {
      "quiz":"King Crimson",
      "songs":[
         "21st Century Schizoid Man",
         "The Court Of The Crimson King",
         "Epitaph",
         "Starless"
      ]
   },
   {
      "quiz":"KISS",
      "songs":[
         "Rock And Roll All Nite",
         "Heaven's On Fire"
      ]
   },
   {
      "quiz":"Lady Gaga",
      "songs":[
         "Born This Way",
         "Bad Romance",
         "Just Dance",
         "Paparazzi",
         "Poker Face"
      ]
   },
   {
      "quiz":"Led Zeppelin",
      "songs":[
         "Stairway To Heaven",
         "Immigrant Song",
         "Whole Lotta Love"
      ]
   },
   {
      "quiz":"Madonna",
      "songs":[
         "Material Girl",
         "Like a Virgin"
      ]
   },
   {
      "quiz":"Metallica",
      "songs":[
         "Enter Sandman",
         "Master Of Puppets",
         "King Nothing"
      ]
   },
   {
      "quiz":"Michael Jackson",
      "songs":[
         "Billie Jean",
         "Beat It",
         "Smooth Criminal",
         "Thriller",
         "Man In The Mirror",
         "Rock With You"
      ]
   },
   {
      "quiz":"Nat King Cole",
      "songs":[
         "L-O-V-E",
         "Joy To The World"
      ]
   },
   {
      "quiz":"Neil Diamond",
      "songs":[
         "Sweet Caroline"
      ]
   },
   {
      "quiz":"Nirvana",
      "songs":[
         "Smells Like Teen Spirit"
      ]
   },
   {
      "quiz":"Oasis",
      "songs":[
         "Wonderwall"
      ]
   },
   {
      "quiz":"Pink Floyd",
      "songs":[
         "Another Brick in the Wall",
         "Wish You Were Here",
         "Comfortably Numb",
         "Shine On You Crazy Diamond",
         "The Great Gig In The Sky",
         "Welcome To The Machine"
      ]
   },
   {
      "quiz":"Prince",
      "songs":[
         "Purple Rain",
         "Kiss",
         "When Doves Cry",
         "Raspberry Beret",
         "1999",
         "Endorphinmachine",
         "Paisley Park",
         "Soft and Wet",
         "P. Control",
         "Alphabet St.",
         "Little Red Corvette",
         "Paisley Park",
         "I Wanna Be Your Lover"
      ]
   },
   {
      "quiz":"PSY",
      "songs":[
         "Gangnam Style"
      ]
   },
   {
      "quiz":"Queen",
      "songs":[
         "Princes Of The Universe",
         "Don't Stop Me Now",
         "Made In Heaven",
         "Sheer Heart Attack",
         "Killer Queen",
         "Another One Bites The Dust",
         "Bohemian Rhapsody",
         "We Will Rock You",
         "Somebody To Love",
         "Radio Gaga",
         "We Are The Champions",
         "Fat Bottomed Girls",
         "Bicycle Race"
      ]
   },
   {
      "quiz":"Rick Springfield",
      "songs":[
         "Jessie's Girl"
      ]
   },
   {
      "quiz":"Ricky Martin",
      "songs":[
         "Livin' la Vida Loca"
      ]
   },
   {
      "quiz":"Savage Garden",
      "songs":[
         "I Want You"
      ]
   },
   {
      "quiz":"Simon & Garfunkel",
      "songs":[
         "Mrs. Robinson",
         "The Sound Of Silence",
         "I Am A Rock"
      ]
   },
   {
      "quiz":"Smash Mouth",
      "songs":[
         "All Star"
      ]
   },
   {
      "quiz":"Starship",
      "songs":[
         "We Built This City"
      ]
   },
   {
      "quiz":"Stevie Wonder",
      "songs":[
         "Superstition"
      ]
   },
   {
      "quiz":"Survivor",
      "songs":[
         "Eye Of The Tiger"
      ]
   },
   {
      "quiz":"Suzanne Vega",
      "songs":[
         "Luka",
         "Tom's Diner"
      ]
   },
   {
      "quiz":"Talking Heads",
      "songs":[
         "Psycho Killer",
         "Burning Down The House"
      ]
   },
   {
      "quiz":"Tears For Fears",
      "songs":[
         "Everybody Wants To Rule The World"
      ]
   },
   {
      "quiz":"The Bangles",
      "songs":[
         "Walk Like An Egyptian"
      ]
   },
   {
      "quiz":"The Beach Boys",
      "songs":[
         "Wouldn't It Be Nice",
         "Surfin' U.S.A.",
         "Fun Fun Fun"
      ]
   },
   {
      "quiz":"The Beatles",
      "songs":[
         "Here Comes The Sun",
         "Let It Be",
         "Come Together",
         "Hey Jude",
         "Ob-La-Di, Ob-La-Da",
         "Twist And Shout",
         "Lucy In The Sky With Diamonds",
         "While My Guitar Gently Weeps",
         "Ticket To Ride",
         "Yellow Submarine"
      ]
   },
   {
      "quiz":"The Buggles",
      "songs":[
         "Video Killed The Radio Star"
      ]
   },
   {
      "quiz":"The Clash",
      "songs":[
         "Rock The Casbah",
         "Should I Stay Or Should I Go"
      ]
   },
   {
      "quiz":"The Cure",
      "songs":[
         "Friday I'm in Love"
      ]
   },
   {
      "quiz":"The Goo Goo Dolls",
      "songs":[
         "Iris",
         "Slide"
      ]
   },
   {
      "quiz":"The Killers",
      "songs":[
         "Mr. Brightside"
      ]
   },
   {
      "quiz":"The Monkees",
      "songs":[
         "Daydream Believer"
      ]
   },
   {
      "quiz":"The Moody Blues",
      "songs":[
         "Nights In White Satin"
      ]
   },
   {
      "quiz":"The O'Jays",
      "songs":[
         "Love Train"
      ]
   },
   {
      "quiz":"The Proclaimers",
      "songs":[
         "I'm Gonna Be (500 Miles)"
      ]
   },
   {
      "quiz":"The Rolling Stones",
      "songs":[
         "Paint It, Black",
         "(I Can't Get No) Satisfaction",
         "Sympathy For The Devil",
         "Jumpin' Jack Flash",
         "Brown Sugar"
      ]
   },
   {
      "quiz":"The Weather Girls",
      "songs":[
         "It's Raining Men"
      ]
   },
   {
      "quiz":"Tom Petty",
      "songs":[
         "Free Fallin'"
      ]
   },
   {
      "quiz":"TOTO",
      "songs":[
         "Africa"
      ]
   },
   {
      "quiz":"Train",
      "songs":[
         "Hey, Soul Sister"
      ]
   },
   {
      "quiz":"Village People",
      "songs":[
         "YMCA"
      ]
   },
   {
      "quiz":"Was (Not Was)",
      "songs":[
         "Walk The Dinosaur"
      ]
   },
   {
      "quiz":"Wham!",
      "songs":[
         "Wake Me up Before You Go-Go",
         "Last Christmas"
      ]
   },
   {
      "quiz":"Whitesnake",
      "songs":[
         "Here I Go Again"
      ]
   },
   {
      "quiz":"Whitney Houston",
      "songs":[
         "I Wanna Dance With Somebody",
         "I Will Always Love You"
      ]
   },
   {
      "quiz":"Yes",
      "songs":[
         "Owner of a Lonely Heart",
         "Roundabout"
      ]
   }
]

module.exports.Artists = artists;