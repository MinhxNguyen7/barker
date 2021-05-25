import mocker from 'mocker-data-generator'

export function scramble(word){
    const letterArr = word.split("");
    let newArr = [];

    const len = letterArr.length;
    for (let start = 0; start < len; start++) {
        // Get a random number between 0 and the highest array index and put it in the new array
        let num = Math.floor(Math.random() * letterArr.length)
        newArr.push(letterArr[num]);
        
        // Remove letter from original array
        letterArr.splice(num,1);
      }

    return(newArr.join(""))
}

export function randomDate(){
  const mocker_schema = {
    date: {faker: 'date.past'}
  }
  const fake_date = mocker().schema('item', mocker_schema, 1).buildSync()['item'][0]['date']
  console.log("Generated fake date: " + String(fake_date))
  return fake_date
}

// Function for getting random user using mocker-data-generator
// This is way too complicated
export function randomUser(){
  const mocker_schema = {
    firstName: {faker: 'name.firstName'},
    lastName: {faker: 'name.lastName'},
    username: {function: function() {
      return (this.object.firstName+this.object.lastName)
    }},
    displayName: {function: function() {
      return (this.object.firstName + " " + this.object.lastName)
    }}
  }

  const fake_user = mocker().schema('user', mocker_schema, 1).buildSync()['user'][0]
  //console.log(fake_user)

  return fake_user
}

export function htmlTagger(text, mode='link'){
  let regex, replacer
  switch(mode){
    case 'link': // Tags for links
      regex=/(<a href=")?((https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))(">(.*)<\/a>)?/gi
      replacer = function(){return '<a href="' + arguments[2] + '" target="_blank">' + (arguments[7] || arguments[2]) + '</a>'}
      break
    case 'hashtag':
      regex=/#(\S*)/g
      replacer=function(){return '<a style="color:#2b9ce2;cursor: pointer">#'+arguments[1]+'</a>'}
      break
    default:
      return text
    }

  let new_text = text
  new_text = new_text.replace(regex,replacer)
  // new_text = new_text.replace(,'<a href="">#$1</a>')
  return new_text
}

export default {scramble, randomUser, randomDate, htmlTagger}