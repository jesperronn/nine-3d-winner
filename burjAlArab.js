// title      : Burj Al Arab hotellet
// author     : Jesper & Jesper Lyster & Rønn
// license    : MIT License
// description: 3d print af vores udsigt
// file       : burjalarab.js

function main() {



    // vores standard objekter
    var firkant = cube({size: [10,10,30]});

    //sejlets z-akse skal have centrum i 10 højde (1/3 oppe)
    var sejlRadius = 28;
    var sejlet  = sphere(sejlRadius)
                    .translate([0,0,10])
                    .setColor([.2,.2,.9,1])
                    .translate([sejlRadius,0,0]);
    var klods   = cube({size: [1,1,1]});


    var sten = [];
    var hotelForm = intersection(firkant,sejlet);
    //sten.push(firkant);
    //sten.push(sejlet)
    sten.push(hotelForm);

    sten.push(klods.translate([30,0,0]));
    sten.push(klods.translate([30,-20,0]));

    return union(sten);
