import React from 'react';
export function getMergeSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    mergeSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log(arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function mergeSort(auxillaryArray, startIndex, endIndex, animations) {
    if(startIndex === endIndex)
        return;
    const middleIndex = Math.floor((startIndex + endIndex)/2);
    mergeSort(auxillaryArray, startIndex, middleIndex, animations);
    mergeSort(auxillaryArray, middleIndex + 1, endIndex, animations);
    merge(auxillaryArray, startIndex, middleIndex, endIndex, animations);
}

function merge(auxillaryArray, startIndex, middleIndex, endIndex, animations) {
    let sortArray = [];
    let i = startIndex;
    let j = middleIndex + 1;
    while(i <= middleIndex && j <= endIndex) {
        //Comparing value at ith and jth index so push them to change their color
        animations.push(["comparision1", i, j]);
        //By changing color we imply that we are comparing those two values and then again we should revert back to their original color so push them again
        animations.push(["comparision2", i, j]);
        if(auxillaryArray[i] <= auxillaryArray[j]) {
            sortArray.push(auxillaryArray[i++]);
        }
        else {
            sortArray.push(auxillaryArray[j++]);
        }
    }
    while(i <= middleIndex) {
        animations.push(["comparision1", i, i]);
        animations.push(["comparision2", i, i]);
        sortArray.push(auxillaryArray[i++]);
    }
    while(j <= endIndex) {
        animations.push(["comparision1", j, j]);
        animations.push(["comparision2", j, j]);
        sortArray.push(auxillaryArray[j++]);
    }
    for (let i = startIndex; i <= endIndex; i++) {
        animations.push(["comparision1", i, i - startIndex]);
        animations.push(["overwrite", i, sortArray[i - startIndex]]);
        animations.push(["comparision2", i, i - startIndex]);
        auxillaryArray[i] = sortArray[i - startIndex];
        animations.push(["done", i, auxillaryArray[i]]);
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



export const MergeSortDesc = {
    title: 'Merge Sort',
    description: (
      <div>
        <p>
          <a
            href="https://en.wikipedia.org/wiki/Merge_sort"
            target="_blank"
            rel="noopener noreferrer"
          >
            Merge Sort
          </a>{' '}
          is an efficient, stable sorting algorith that makes use of the
          divide and conquer strategy. Conceptually the algorithm works as
          follows:
        </p>
        <ol>
          <li>
            Divide the unsorted list into <em>n</em> sublists, each
            containing one element(a list of one element is considered
            sorted)
          </li>
          <li>
            Repeatedly merge sublists to produce new sorted sublists until
            there is only one sublist remaining. This will be the sorted
            list.
          </li>
        </ol>
      </div>
    ),
    worstCase: (
      <span>
        O(<em>n</em> log <em>n</em>)
      </span>
    ),
    avgCase: (
      <span>
        O(<em>n</em> log <em>n</em>)
      </span>
    ),
    bestCase: (
      <span>
        O(<em>n</em> log <em>n</em>)
      </span>
    ),
    space: (
      <span>
        O(<em>n</em>)
      </span>
    )
  };