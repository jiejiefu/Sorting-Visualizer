import React from 'react';
export function getInsertionSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    insertionSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("sort works correctly? ",arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function insertionSort(auxillaryArray, animations) {
    const N = auxillaryArray.length;
    for (let i = 1; i < N; i++) {
        let key = auxillaryArray[i];
        let j = i - 1;
        animations.push(["comparision1", j, i]);
        animations.push(["comparision2", j, i]);
        while(j >= 0 && auxillaryArray[j] > key) {
            animations.push(["overwrite", j + 1, auxillaryArray[j]]);
            auxillaryArray[j + 1] = auxillaryArray[j];
            j = j - 1;
            if(j >= 0) {
                animations.push(["comparision1", j, i]);
                animations.push(["comparision2", j, i]);
            }     
        }
        animations.push(["overwrite", j + 1, key]);
        auxillaryArray[j + 1] = key;
        for (let k = 0; k <= i; k++) animations.push(["done", k, auxillaryArray[k]]);
    }
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}



export const InsertionSortDesc = {
    title: 'Insertion Sort',
    description: (
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Insertion_sort"
          target="_blank"
          rel="noopener noreferrer"
        >
          Insertion Sort
        </a>{' '}
        is a simple sorting algorithm that iterates through an array and
        at each iteration it removes one element from the array, finds the
        location it belongs to in the sorted list and inserts it there,
        repeating until no elements remain in the unsorted list. It is an
        in-place, stable sorting algorithm that is inefficient on large
        input arrays but works well for data sets that are almost sorted.
        It is more efficient in practice compared to other quadratic
        sorting algorithms like bubble sort and selection sort.
      </p>
    ),
    worstCase: (
      <span>
        O(n<sup>2</sup>)
      </span>
    ),
    avgCase: (
      <span>
        O(n<sup>2</sup>)
      </span>
    ),
    bestCase: <span>O(n)</span>,
    space: <span>O(1)</span>
  };