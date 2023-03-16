function reverseString(str) {
  var charList = str.split("");
  var reversedListOfchar = charList.reverse();
  var reverseStr = reversedListOfchar.join("");

  return reverseStr;
}

function isStringPalindrome(str) {
  var reverse = reverseString(str);

  return reverse === str;
}

function convertDateToString(date) {
  var dateStr = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormat(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormat(date) {
  var dateFormatList = getAllDateFormat(date);
  var palindromeList = [];

  for (let i = 0; i < dateFormatList.length; i++) {
    var result = isStringPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 100 === 0) {
    return false;
  }

  if (year % 4 === 0) {
    return true;
  }

  return false;
}

function getNextDate(date) {
  console.log(date);

  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonths[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = convertDateToString(nextDate);
    var resultList = checkPalindromeForAllDateFormat(dateStr);
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date){
  var day = date.day-1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(day === 0){
    month--;

    if(month===0){
      month = 12;
      day = 31;
      year--;
    }
    else if(month === 2){
      if(isLeapYear(year)){
        day = 29;
      }
      else{
        day = 28;
      }
    }
    else{
      day = daysInMonth[month-1];
      
    }
  }

 


  return {
    day:day,
    month:month,
    year:year
  }

}


function getPreviousPalindromeDate(date){
  var prevDate = getPreviousDate(date);
  var ctr = 0;

  while(1){
    ctr++;
    var dateStr = convertDateToString(prevDate);
    var resultList = checkPalindromeForAllDateFormat(dateStr);

    for(let i=0; i<resultList.length; i++){
      if(resultList[i]){
        return [ctr,prevDate]
      }
    }
    prevDate = getPreviousDate(prevDate);
  }
}


var bdayInput = document.querySelector("#date-input");
var showBtn = document.querySelector("#show-btn");
var result = document.querySelector("#result");

function clickHandler(e) {
  var bdayString = bdayInput.value;
  if (bdayString !== "") {
    var date = bdayString.split("-");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];
  }
  var date = {
    day: Number(dd),
    month: Number(mm),
    year: Number(yyyy),
  };

  var dateStr = convertDateToString(date);
  var list = checkPalindromeForAllDateFormat(dateStr);
  var isPalindrome = false;

  for (let i = 0; i < list.length; i++) {
    if (list[i]) {
      isPalindrome = true;

      break;
    }
  }

  if (!isPalindrome) {
    const [ctr1, nextDate] = getNextPalindromeDate(date);
    const [ctr2, prevDate] = getPreviousPalindromeDate(date);
    if (ctr1 > ctr2) {
      result.innerText = ` The nearest Palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year} , you missed by ${ctr2} days.`;
    } else {
      result.innerText = `The nearest Palindrome date is  ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed by ${ctr1} days.`;
    }
  } else {
    result.innerText = "Yay! your date is Palindrome";
  }
}

showBtn.addEventListener("click", clickHandler);
