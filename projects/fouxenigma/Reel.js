

class Reel {
  constructor(plain_text,cypher_text,key) {
    //TODO: error checking.  text arrays need to be same size and contain unique letters.
    //Convert inputs to an array so that they are easier to shift
    this.plain_text = plain_text.split('');
    this.cypher_text = cypher_text.split('');
    this.shift_position = 0;
    this.wheel_size = plain_text.length;
		this.key = key;
		this.setKey(key);
  }

  get state() {
    return {
      shift_position: this.shift_position,
      encode:this.plain_text.join(''),
      decode:this.cypher_text.join('')};
  }

  setKey(key){
    //TODO: validate key is a number

    //If wheel size is 27 and the key is larger,
    //Wrap around and start from the beginning
    //(i.e full rotation of the wheel)
    key = key % this.wheel_size;

    if(key == this.shift_position){
      return;
    }else{
      //shift until the shift position matches the key
      for(let i=0; i<this.wheel_size; i++){
        if(key != this.shift_position){this.shift();}
      }
    }
    return;
  }

  encode(plain_text) {
    let chars = plain_text.split(''); //convert to array
    let cypher_text = ''; //return value

		console.log(this.key);
    this.setKey(this.key);

    //For each of the characters of the input
    for(let i=0; i<chars.length; i++){

      //find the mapping on the wheel
      for(let j=0; j<this.wheel_size; j++){
        if(this.plain_text[j] == chars[i]){
          //add the cypher char to the return string
          cypher_text += this.cypher_text[j];
          break ;
        }
      }

      //Shift the wheel forward for the next input
      this.shift();
    }

    return cypher_text;
  }

  decode(cypher_text) {
    //convert to an array and reverse
    //start decrypting from the end and shift in reverse
    let chars = cypher_text.split('').reverse();
    let plain_text = ''; //return value

    this.setKey(this.key+chars.length);

    //For each of the characters of the input
    for(let i=0; i<chars.length; i++){
      this.unshift(); //Shift backwards

      //find the mapping on the whell
      for(let j=0; j<this.wheel_size; j++){
        if(this.cypher_text[j] == chars[i]){
          //add the plain char to the return string
          plain_text += this.plain_text[j];
          break ;
        }
      }
    }

    //reverse the reversed string
    return plain_text.split('').reverse().join('');
  }


  shift() {
    //peel a char off the end and append it to the front
    var a = this.cypher_text.splice(this.wheel_size-1,1)
    this.cypher_text.splice(0,0,a[0]);

    //increment the position (wrap if exceeds wheel size)
    this.shift_position = (this.shift_position + 1) % this.wheel_size;
    return;
  }

  unshift() {
    //Peel a char off the front and append it to the end
    var a = this.cypher_text.splice(0,1);
    this.cypher_text.push(a[0]);

    //decrement the shift position (wrap if it is smaller than zero)
    this.shift_position --;
    if(this.shift_position < 0){
      this.shift_position = this.wheel_size + (this.shift_position  % this.wheel_size);
    }
    return;
  }
}
