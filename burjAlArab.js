// title      : Burj Al Arab hotellet
// author     : Jesper & Jesper Lyster & Rønn
// license    : MIT License
// description: 3d print af vores udsigt
// file       : burjalarab.js

function main() {



    // vores standard objekter
    var firkantSize = 10;
    var firkant = cube({size: [firkantSize,firkantSize,26]})
                    .translate([-firkantSize/2,-firkantSize/2,0]);
    

    //sejlets z-akse skal have centrum i 10 højde (1/3 oppe)
    var sejlRadius = 30;
    var sejlet  = sphere(sejlRadius)
                    .translate([0,0,10])
                    .setColor([.2,.2,.9,1])
                    .translate([2/3*sejlRadius,2/3*sejlRadius,0]);
    var klods   = cube({size: [1,1,1]});


    var sten = [];
    var hotelForm = intersection(firkant,sejlet);
    //sten.push(firkant);
    //sten.push(sejlet)
    sten.push(hotelForm);

    //sten.push(klods.translate([0,0,0]));
    sten.push(klods.translate([0,10,0]).setColor(1,0,0));
    sten.push(klods.translate([0,0,-10]).setColor(0,1,0));
    sten.push(klods.translate([10,0,0]).setColor(0,0,1));

    return union(sten);
    
}
