/* Create a menu app as seen in this week's video
   a. Use at least one array
   b. Use at least two classes
   c. The menu should have the options to create, view, and delete elements
   */

class Card {
    constructor (name, rarity) {
      this.name = name;
      this.rarity = rarity;
  
    }
    // describe() {
    //   return `${this.name} has ${this.rarity}.`;  // tells info about the Cards
  
    // }
  }
  
  class Set {
    constructor(name) {  // Set name
      this.name = name;
      this.cards = [];  // each time a Set is created we have an array that holds all the Cards on that Set
    }
  
  
    addCard(card) {
      if (card instanceof Card) {  // from this a number or a string cannot be entered
        this.cards.push(card);
  
      } else {
        throw new Error (`You can only add an instance of card. Argument is not a card: ${card}`);
      }
    }
  
    describe() {
      return `${this.name} has ${this.cards.length} cards.`;  
          // prints out the name of the Set and how many Cards are on that Set
    }
  }
  
  class Menu {  // this class is the menu itself and what will drive all of the choices
    constructor() {
      this.set = [];  // this will create the array of the sets
      this.selectedSet = null;  //we will be managing one Set at a time, so we want to know which set is selected
    }                            //we set it at null to start, because when beginning NO sets are selected
  
  
    
  
    start() {  // added 'start' method to menu because that is what will start up the menu application
       let selection = this.showMainMenuOptions(); 
  
       while (selection != 0) {  // what option in our menu has the user selected, this will return selection that user gives us
        switch (selection) {
          case '1':             // if they select '1' we'll create a set
            this.createSet();
            break;
          case '2':             // if they select '2' we'll view the set
            this.viewSet();
            break;
          case '3':             // if they select '3' we'll delete the set
            this.deleteSet();
            break;
          case '4':             // if select '4' we'll display all sets
            this.displaySets();
            break;
          default:
            selection = 0;
        }
        selection = this.showMainMenuOptions();  // if they select anything but 0-4, brings back to menu?
      }
      alert('See ya!'); // if they select 0
    }
  
  
      
    showMainMenuOptions() {  // this is the pop up box for user input
      return prompt(`
        0) Exit
        1) Create new set
        2) View set
        3) Delete set
        4) Display all sets
        `);
          
    }
  
    showSetMenuOptions(SetInfo) {   
      return prompt (`
      0) Back
      1) Create card
      2) Delete card
      --------------------
      ${SetInfo}
      `);
    }  
  
  /* 'displaySets' below will create a blank string, iterate through the sets, grab each set, and get the name for
      for that specific set so that all the sets will show up with a index line numbering them 0,1,2,etc all on a 
      different line */
  
    displaySets() {
      let setString = '';    // start w/ a blank string, we need to build a string that has all the info for the sets
                              //   so we can put it up in message box or prompt
      for (let i = 0; i < this.set.length; i++) { // this.sets is an array of all the sets that exist
        setString += i + ') ' + this.set[i].name + '\n';  // we concatenate all the set information
                                    // this.sets[i].name - we grab the current set we're looking at for this iteration
      }
  
      alert(setString);  // will enable us to see all Sets after the loop is complete
    }
  
    createSet() {
      let name = prompt('Enter name for new set:');
      this.set.push(new Set(name));  // name of set will be pushed to Sets array
    }
  
    viewSet() {    // we want to see the details of a set
      let index = prompt ('Enter the index # of the set you wish to view:');
      if (index > -1 && index < this.set.length) {     
        this.selectedSet = this.set[index];     ;
        let description = 'Set Name: ' + this.selectedSet.name + '\n';  // '\n' is a new line
      
  
      // below - selected.set is the set, .cards is the cards array which we want to iterate through,
      //         so we get the length of that array
  
        for (let i = 0; i < this.selectedSet.cards.length; i++) {
          description += i + ') ' + this.selectedSet.cards[i].name + ' - ' + this.selectedSet.cards[i].rarity + '\n';
  
      // description += i : we want to print out the index #
      // this.selected.cards[i].name : the specific card we're looking at and the name of that card
      // .rarity  : to get the rarity  and a new line
  
        }1
        
  
  
        let selection = this.showSetMenuOptions(description);
        switch (selection) {  
          case '1':
            this.createCard();
            break;
          case '2':
            this.deleteCard();
        }
      }
    }
    
  
    deleteSet() {
      let index = prompt('Enter index of the set you wish to delete:');
      if (index > -1 && index < this.set.length) {
        this.set.splice(index, 1);
      }
    }
  
    createCard() {
      let name = prompt('Enter name for new card:');
      let rarity  = prompt('Enter rarity for new card:');
      this.selectedSet.cards.push(new Card(name, rarity )); 
    }
  
  
    deleteCard() {
      let index = prompt('Enter the index # of card you wish to delete:');
      if (index > -1 && index < this.selectedSet.cards.length) {
        this.selectedSet.cards.splice(index, 1);
  
      }
    }
  }
  
  let menu = new Menu();
  menu.start();