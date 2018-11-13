# REDIS Laboratory

Laboratory of REDIS in NodeJS.

Using REDIS as cache to serve files from filesystem. I implemented a delay of 5 seconds in filesystem.helper to simulate a slow speed of a disk. 

NOTE: The maximum size of a hash value of REDIS is 512Mb.

### Advantages of REDIS

+ High performance
+ Differents kinds of persistence: RDB (based on snapshots) and AOF (like a DB)
+ Transactional ops (not ACID)
+ Subscription/Publication mechanism
+ Pipelining allowed to chaining multiple requests

### Drawbacks of REDIS

- High RAM consumption
- Not the best choice for multimedia large files (512 Mb max per hash)
- Embedded compression not supported


  
