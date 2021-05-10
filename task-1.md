
### Problem Statement - TASK 1
Read 10 gigabytes of data and sort it.

They are all integers like 10000, 16723998 etc.

Same integer values can be repeatedly appearing in the file.

You have 1 gigs of ram and 240 Gigabyte of hard drive.


To handle this big data we need external sorting algorithms(K-way merge algorithm / merge sort is one of them). Basically what it does is 
it sorts chunks that each fit in RAM of the system, then merges the sorted chunks together.
Let's take an example:
let's say with convention 
10 GB = 10000 MB
For sorting 10000 megabytes of data using only 100 megabytes of RAM (we can utilise the full RAM as we have 1 gigs but let's go with 100 mb) :

1.Read 100 mb of the data in main memory and sort.
2.Write the sorted data to disk.
3.Repeat steps 1 and 2 until all of the data is in sorted chunks (there are 10000MB / 100MB = 100 chunks), which now need to be merged into one single output file.
4.Read the first row of each sorted chunk into input buffers in main memory and allocate the remaining  for an output buffer.
5.Perform a k-way merge and store the result in the output buffer. 
Whenever the output buffer fills, write it to the final sorted file and empty it.
Here each chunk does not have to be loaded completely; rather, sequential parts of the chunk can be loaded as needed.



To overcome the above problem in node, we need to break the large data into multiple chunks, a data structure to hold those chunks.
We have buffer(data structure) in NODEJS, and it stores binary data.
And we can use Streams(NODEJS) to read and write chunks systematically. We need to use .pipe() method to attach the readable stream to writable stream. 

PSEUDO CODE :
```sh
const stream = require('stream');
const fs = require('fs');

const readabale = fs.createReadStream(fileName);
const writeable = fs.createWriteStream(destPath);


fs.stat(fileName, (err, stats) => {
  
    readabale.on('data', (chunk) => {
        // chunk is read here 
        // do sorting here
    });
    readabale.on('end', (e) => {
        // reading chunks from readable stream is done.
    });
    
    
    readabale.pipe(writeable); 

    writeable.on('unpipe', (e) => {
       // in case encountered any error
    });

    
});
```

#####References:
https://en.wikipedia.org/wiki/K-way_merge_algorithm