// title      : Burj Al Arab hotellet
// author     : Jesper & Jesper Lyster & Rønn
// license    : MIT License
// description: 3d print af vores udsigt
// file       : burjalarab.js




function main() {


function side() {
   var tykkelse = 0.7 
   var sphereSize = 30;
   var sphereDisplacement = [5,-15,0];
   var bigSphere = sphere({r:sphereSize, center: true}).translate(sphereDisplacement);
   var smallSphere = sphere({r:sphereSize-1, center:true}).translate(sphereDisplacement);   
   //smallSphere = bigSphere.scale((sphereSize-1)/sphereSize);

   var bue = function(){
       var plane = cube({size: [100,100,tykkelse]}); 
       var sword = difference(bigSphere, smallSphere);
       return intersection(plane,sword);
   }
   
   var firkantHoejde = 30;
   var sten = [];
   var lodret = cube({size: [firkantHoejde,2,tykkelse]}).setColor([1,0,0]);
   var side = cube({size: [1,15,tykkelse]});

    sten.push(lodret);
    sten.push(side.translate([firkantHoejde*0.7,0,0]));
    sten.push(side.translate([firkantHoejde*0.45,0,0]));
    sten.push(side.translate([firkantHoejde*0.2,0,0]));
    sten.push(bue());
    
   
    // Siderne er bevidst lavet for lange, så bigsphere sørger
    // for at skære dem pænt.
    return intersection(bigSphere, union(sten));
   
   
}



    var firkantSize = 10;
    var spirSize    = .7;
    //hotelform flytning med centrum i firkant
    var halv = firkantSize/2;
    var firkantFlyt = [-halv, -halv, 0];
    //hotel spir flyttes den anden vej
    var spirFlyt = [halv,halv,0];

    // vores standard objekter
    var firkant = cube({size: [firkantSize,firkantSize,26]})
                    .translate(firkantFlyt);


    // sejlets z-akse skal have centrum i 10 højde (1/3 oppe)
    var sejlRadius = 30;
    var sejlet  = sphere(sejlRadius)
                    .translate([0,0,10])
                    .setColor([.2,.2,.9,1])
                    .translate([2/3*sejlRadius,2/3*sejlRadius,0]);
    var klods   = cube({size: [1,1,1]});
    var spir    = cube({size:[spirSize, spirSize,40]})
                    .translate(spirFlyt)
                    .setColor(0,1,0);
                    //.scale(.5);

    var sten = [];
    var hotelForm = intersection(firkant,sejlet);
    //sten.push(firkant);
    //sten.push(sejlet)
    sten.push(hotelForm);
    sten.push(spir);

    //sten.push(klods.translate([0,0,0]));
    sten.push(klods.translate([0,10,0]).setColor(1,0,0));
    sten.push(klods.translate([0,0,-10]).setColor(0,1,0));
    sten.push(klods.translate([10,0,0]).setColor(0,0,1));

    var side1 = side().rotateX(90).rotateY(-90).translate([5,5.7,0]).setColor([1,0,0]);
    var side2 = side().rotateX(180).rotateY(-90).translate([5,5,0]);

    sten.push(side1);
    sten.push(side2);

    return union(sten);

}
