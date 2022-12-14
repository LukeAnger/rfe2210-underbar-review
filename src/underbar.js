(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n >= array.length) {
      return array;
    }
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n, n + 1);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }

    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }

  };


  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    for (var i = 0; i < collection.length; i++) {

      var truthies = [];

      _.each(collection, function(item) {

        if (test(item)) {
          truthies.push(item);
        }
      });

    }
    return truthies;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    return _.filter(collection, function(item) {
      return !test(item);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // You can safely ignore the isSorted parameter in your solution!
    // The isSorted parameter is only included for consistency with Underscore's
    // version of uniq, and its functionality is not specifically tested here.

    // The iterator specifies what _.uniq uses to decide if an item is a
    // duplicate or not. _.uniq should use an item's transformed value, the result
    // of invoking iterator on the item, to determine whether or not the original
    // item is unique in the collection so far.

    // If there is no defined iterator, _.uniq should default to use
    // an item's original value to determine uniqueness.





    var duplicates = [];
    /*
    if (iterator !== undefined) {
      _.each(array, function(item, index) {
        duplicates.push(iterator(item, index, array));
      });
      console.log('test');
    }
    console.log(array, arguments);
*/



    if (iterator !== undefined) {
      var temp = [];
      var temp2 = [];
      _.each(array, function(item, index) {
        temp.push(iterator(item, index, array));
      });
      var indexes = [];
      for (var i = 0; i < array.length; i++) {
        //array = iterator(array[i], i, array);
        if (_.indexOf(temp2, temp[i]) === -1) {
          temp2.push(temp[i]);
          indexes.push(i);
          duplicates.push(array[i]);
        }
      }
      return duplicates;
    }
    for (var i = 0; i < array.length; i++) {
      //array = iterator(array[i], i, array);
      if (_.indexOf(duplicates, array[i]) === -1) {

        duplicates.push(array[i]);
      }
    }
    return duplicates;
  };









  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var map = [];

    _.each(collection, function(item, index) {
      map.push(iterator(item, index, collection));

    });
    return map;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Since JavaScript object properties are not stored in any particular order,
  // we cannot reliably anticpate what property will be accessed first during
  // property iteration. Given this, it is not necessary for your solution
  // to be able to handle the case of an object being passed in with no
  // initial accumulator.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // TIP: To support both arrays and objects, try re-using each() here
    //var output = accumulator;


    _.each(collection, function(item, index) {
      if ( accumulator === undefined && index === 0) {
        accumulator = item;
      } else {
        accumulator = iterator(accumulator, item, index, collection);
      }
    });
    return accumulator;
  };


  // --------------------
  // ! END OF PART ONE !
  // --------------------
  //
  // Congrats! You've reached the end of Underbar Part 1!
  //
  // This means that you should return to Learn and move on to the next lesson:
  //    - Learn Unit: Debugging
  //    - Learn Lesson: Before Moving On
  //
  // CAUTION:
  //
  //   - Do not proceed on to Underbar Part 2 (below) without reading the
  //     slides on Scopes & Closure
  //
  // --------------------


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    return _.reduce(collection, function(first, item) {
      if (iterator === undefined) {
        return !!item;
      }
      return !!iterator(item) && first;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined) {
      for (var i = 0; i < collection.length; i++) {
        if (!!collection[i]) {
          return true;
        }
      } return false;
    }
    return !_.every(collection, function(item) {
      return !iterator(item);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    /* FIGURE OUT WHY THIS WAS NOT WORKING
    _.each(arguments, function(inputObj) {
      _.each(inputObj, function(property, key) {
        if (obj[key] === undefined) {
          obj[key] = property;
        }
      });
    });
    */


    for (var key1 in arguments) {
      for (var key2 in arguments[key1]) {

        obj[key2] = arguments[key1][key2];

      }
    }
    return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var key1 in arguments) {
      // console.log(arguments[key1]);
      for (var key2 in arguments[key1]) {
        if (obj[key2] === undefined) {
          obj[key2] = arguments[key1][key2];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var funcValues = {};
    return function() {
      var arg = JSON.stringify(arguments);
      if (!funcValues[arg]) {
        funcValues[arg] = func.apply(this, arguments);
      }
      return funcValues[arg];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var arg = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, arg);
    }, wait);
  };



  /**
   * COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var output = [];
    var copy = array.slice();
    var len = copy.length;

    while (len !== 0) {
      var rng = Math.floor(Math.random() * len);
      len--;
      output[len] = copy.splice(rng, 1)[0];

    }
    return output;
  };


/**
   * ADVANCED: EXTRA CREDIT BEGINS HERE
   * =================
   *
   * Note: This is the end of the required pre-course curriculum. Feel free to continue,
   * but everything beyond here is extra credit.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    /* I: collection = array;
          functionOrKEy = method or function called as a string;
          args = any argument of type string
       O: array with the method called on each element
       C: N/A
       E: not an array, empty arrays, undefined etc.
    */
    var output = [];

    /*  var upperCasedStrings = _.invoke(['dog', 'cat'], 'toUpperCase');

        expect(upperCasedStrings).to.eql(['DOG', 'CAT']);
    */

    if (typeof functionOrKey === 'function') {
      for (var i = 0; i < collection.length; i++) {
        // apply toUppercase to current element
        // push that to output
        output.push(functionOrKey.apply(collection[i]));
      }

    } else {

      for (var i = 0; i < collection.length; i++) {
        // apply toUppercase to current element
        // push that to output
        output.push(collection[i][functionOrKey].apply(collection[i]));

        // collection[i].toUpperCase()
        //String.toUpperCase()
        //String['toUpperCase']
        //"dog"['toUpperCase']
      }
    }
    console.log(output);
    return output;
    // conditional to check type of functionORKEY check for funciton, string
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3])
  // returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array

  /*
        var nestedArray = [1, [2], [3, [[[4]]]]];

        expect(_.flatten(nestedArray)).to.eql([1, 2, 3, 4]);
  */
  _.flatten = function(nestedArray, result) {
    // let output = [];
    // if not array then push
    // base cases : 1
    if (!Array.isArray(nestedArray)) {
      console.log(nestedArray);
      return [nestedArray];
    } else {
      // base case: [1]
      if (nestedArray.length === 1) {
        return _.flatten(nestedArray[0]);
      } else {
        return _.flatten(nestedArray[0]).concat(_.flatten(nestedArray.slice(1)));
      }
    }
  };

  //base case : [[1]]
  // base case [1, 2]
  //   if (nestedArray.length === 1) {
  //     return nestedArray;

  //   }
  //   if (!Array.isArray(nestedArray[0])) {
  //     // output.push(nestedArray[0])
  //     output.push(nestedArray[0]);
  //     //   return flatten(nestedArray.slice(1))
  //     return _.flatten(nestedArray.slice(1));
  //   } else {
  //     return _.flatten(nestedArray[0]);
  //   }
  // };

  // for (let i = 0; i < nestedArray.length; i++) {
  //     if (!Array.isArray(nestedArray[i])) {
  //       output.push(nestedArray[i]);
  //       if (nestedArray[i + 1]) {
  //         console.log(nestedArray[i + 1]);
  //         _.flatten(nestedArray[i + 1]);
  //       }
  //     } else {
  //       _.flatten(nestedArray[i]);
  //     }

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
