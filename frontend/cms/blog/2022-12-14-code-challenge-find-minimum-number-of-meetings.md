---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T01:02:41.242Z
title: Code Challenge, Find minimum number of meetings
metaDescription: given N denoting number of meetings to be arraned, their are M
  rooms where A\[i] denotes the price of i'th room, organise these meetings at
  the minimum total cost. in order to arrange a meeting, you acquire a room
  whicch is empty and pay its price only for the first time you use that room
  for a meeting and after that you can use this room for free for other meetings
  any number of times. at a time at most one meeting can be organised in a
  single room. two meetings can be held in the same room if and only if their
  schedules are disjoint. you are given L and R where L\[i] is the starting and
  R\[i] is the ending time of the i'th meeting, schedules of the two meetings i
  and j are said to be disjoint if L\[i] > R\[j] or L\[j]>R\[i].
thumbnail: https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
---
# Find minimum number of meetings

given N denoting number of meetings to be arraned, their are M rooms where A\[i] denotes the price of i'th room, organise these meetings at the minimum total cost. in order to arrange a meeting, you acquire a room whicch is empty and pay its price only for the first time you use that room for a meeting and after that you can use this room for free for other meetings any number of times. at a time at most one meeting can be organised in a single room. two meetings can be held in the same room if and only if their schedules are disjoint. you are given L and R where L\[i] is the starting and R\[i] is the ending time of the i'th meeting, schedules of the two meetings i and j are said to be disjoint if L\[i] > R\[j] or L\[j]>R\[i].

 if N=3 L=\[2,5,4] R=\[4,7,6] M=4 A=\[8,9,2,4] the code must output 6 as the answer

```
function solve(N, L, R, M, A) { 
    //N: number of meetings
    //L: starting
    //R: ending
    //M: total rooms
    //A: price
    // console.log(`N ${N}, L ${L}, R ${R}, M ${M}, A ${A}`)
    

    let meetings = [];
    for(let i =0; i<N; i++)
        meetings.push({
            start: L[i],
            end: R[i],
        });

    
    meetings.sort((a,b)=> a.start - b.start);

    //sort the rooms by their price
    const rooms = A
    .map((price,index)=>({price,index}))
    .sort((a,b)=> a.price-b.price);


    //keep track of the total cost and the rooms we've used
    let totalCost = 0;
    const usedRooms = new Set();

    // console.log(rooms,meetings, rooms.length)

    //for each meeting find the cheapest availible room
    for({start,end} of meetings){
        let room = null;

        //problematic code here
        for(r of rooms){
            if(!usedRooms.has(r.index) && isAvailable(r.index,start,end)){
                room = r;
                break;
            }
        }

        //if we found a room, add its price to the total cost and mark it as used
        if(room){
            totalCost = totalCost + room.price;
            usedRooms.add(room.index);
        }
    }
    return totalCost
}
```