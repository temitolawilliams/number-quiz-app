const images = [
    {
      image_name: 'bananas.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'birthday candles.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'blocks.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'brushes.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'cakes.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'cars.jpg',
      number_of_items: 2,
    },
    {
      image_name: 'crayons.jpg',
      number_of_items: 8,
    },
    {
      image_name: 'cupcakes.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'deer.jpg',
      number_of_items: 3,
    },
    {
      image_name: 'donuts.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'ducks.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'eggs.jpg',
      number_of_items: 8,
    },
    {
      image_name: 'elephants.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'hot air balloons.jpg',
      number_of_items: 5,
    },
    {
      image_name: 'jelly beans.jpg',
      number_of_items: 9,
    },
    {
      image_name: 'macaroons.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'pencils.jpg',
      number_of_items: 12,
    },
    {
      image_name: 'people.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'peppers.jpg',
      number_of_items: 2,
    },
    {
      image_name: 'pizza slices.jpg',
      number_of_items: 8,
    },
]
    let currentImageValue = 0;
    let displayNumber = 0;
    let score = 0;
    let totalAvailabe = images.length;
    let chosenButton = false,
    startQuestion = 1;
    document.getElementById('statsContent').style.visibility = 'hidden';
    document.getElementById('currentScore').innerHTML = score;
    document.getElementById('totalAvailable').innerHTML = totalAvailabe;
    document.getElementById('endQuestion').innerHTML = totalAvailabe;



  const setImageSrc = (randomImageName) =>{
    const imageContainer = document.getElementById('imageContainer');
    if(imageContainer.hasChildNodes()) {
        imageContainer.removeChild(imageContainer.firstElementChild)
    }
    const image = document.createElement('img');
    image.src = `images/${randomImageName}`;
    image.classList.add('fade'); 
    imageContainer.appendChild(image)
  }
  const generatePlusOrMinus = () =>{
     const number0to1 = Math.floor(Math.random() * 2);
     return number0to1 === 0 ? -1 : +1;
  }



  const generateDisplayNumber = (plusOrMinus, numberOfItems) => {
      let splitNumber = Math.floor(Math.random() * 2);
      //display real number
      if(splitNumber === 0) {
        document.getElementById('number').innerHTML = numberOfItems
        displayNumber = numberOfItems;
      }else{
        //display number higher or lower than 1
        document.getElementById('number').innerHTML = `${numberOfItems + plusOrMinus}`
        displayNumber = numberOfItems + plusOrMinus;
      } 

      currentImageValue = numberOfItems
    }

  const generateDisplayNames = (randomImageName) => {
       
        newImageName =  randomImageName.slice(0, randomImageName.length - 4)
        document.getElementById('itemName').innerHTML = newImageName + '?';
  }
  
    let randomImageName;
  const generate = () => {
      console.log(currentImageValue, displayNumber)
    if(images.length === 0){
        gameOver()
        stopTimer()
        return
    }
    
    document.getElementById('startQuestion').innerHTML = startQuestion++;
     chosenButton =false;
     const randomNumber = Math.floor(Math.random() * images.length);
     randomImageName = images[randomNumber].image_name;
    setImageSrc(randomImageName);
    generateDisplayNames(randomImageName)
    const plusOrMinus = generatePlusOrMinus()
    const numberOfItems = images[randomNumber].number_of_items;
    generateDisplayNumber(plusOrMinus, numberOfItems)
    images.splice(randomNumber, 1);
  }

  const match = () => {
      if(!chosenButton) {
        currentImageValue === displayNumber ? score++ : score;
        chosenButton = true;
        document.getElementById('currentScore').innerHTML = score;
      }
       
  }

  const unmatch = () => {
      if(!chosenButton){
        currentImageValue !== displayNumber ? score++ : score;
        chosenButton = true;
        document.getElementById('currentScore').innerHTML = score
      }
      
  }

  let timeref;
  const timer = () => {
     timeref =  setInterval(generate, 5000)
  }
  
  const play = () => {
    document.getElementById('statsContent').style.visibility = 'visible'
    //document.getElementById('statsContent').style.display = 'inline';
      document.getElementById('startScreen').style.display = 'none';
      document.getElementById('playButtton').style.display = 'none';

      generate();
      timer()
  }
  const gameOver = () => {
      document.getElementById('message').style.display = 'block';
      document.getElementById('imageContainer').style.display = 'none';
      document.getElementById('statsContent').style.display = 'none';
      document.getElementById('message').innerHTML = `Game over, your score is: <br>
       ${score}/${totalAvailabe}`
       setTimeout(() => location.reload(), 5000)
  }
  const stopTimer = () => {
      clearInterval(timeref)
  }