// title      : Burj Al Arab hotellet
// author     : Jesper & Jesper Lyster & Rønn
// license    : MIT License
// description: 3d print af vores udsigt
// file       : burjalarab.jscad




function main() {


    // Laver en template for hvordan en side ser ud
    function sideTemplate() {
        var thickness = 0.7
        var sphereSize = 30;
        var sphereDisplacement = [5,-15,0];
        var bigSphere = sphere({ r:sphereSize, center: true }).translate(sphereDisplacement);
        var smallSphere = sphere({ r:sphereSize - 1, center:true }).translate(sphereDisplacement);


        // buen kommer som en kugleskal intersectet med et plan
        var circleArc = function () {
       var plane = cube({ size: [100,100,thickness] });
       var sword = difference(bigSphere, smallSphere);
       return intersection(plane, sword);
   }

        var height = 30;
        var blocks = [];
        var verticalBeam = cube({ size: [height,2,thickness] }).setColor([1,0,0]);
        var horizontalBeam = cube({ size: [1,15,thickness] });

        blocks.push(verticalBeam);
        blocks.push(horizontalBeam.translate([height * 0.7,0,0]));
        blocks.push(horizontalBeam.translate([height * 0.45,0,0]));
        blocks.push(horizontalBeam.translate([height * 0.2,0,0]));
        blocks.push(circleArc());

        // Siderne er bevidst lavet for lange, så bigsphere sørger
        // for at skære dem pænt.
        return intersection(bigSphere, union(blocks));

    }

    // Placer de 2 templates i en ret vinkel
    function sides()
    {
        var blocks = [];

        var side1 = sideTemplate().rotateX(90).rotateY(-90).translate([5,5.7,0]).setColor([1,0,0]);
        var side2 = sideTemplate().rotateX(180).rotateY(-90).translate([5,5,0]);
        blocks.push(side1);
        blocks.push(side2);
        return union(blocks);
    }


    // Laver hovedbygningen
    function building()
    {
        var mainSize = 10;
        // hotelform flytning med centrum i firkant
        var half = mainSize / 2;
        var firkantFlyt = [-half, -half, 0];

        // vores standard objekter
        var firkant = cube({ size: [mainSize,mainSize,26] })
                        .translate(firkantFlyt);

        // sejlets z-akse skal have centrum i 10 højde (1/3 oppe)
        var sailRadius = 30;
        var sail  = sphere(sailRadius)
                        .translate([0,0,10])
                        .setColor([.2,.2,.9,1])
                        .translate([2 / 3 * sailRadius,2 / 3 * sailRadius,0]);
        var blocks = [];
        var HotelShape = intersection(firkant, sail);

        blocks.push(HotelShape);

        return union(blocks);
    }

    // Laver spiret
    function spire()
    {
        var firkantSize = 10;
        var spireSize    = .7;
        // hotelform flytning med centrum i firkant
        var half = firkantSize / 2;
        // hotel spir flyttes den anden vej
        var spireMove = [half,half,0];
        return cube({ size:[spireSize, spireSize,40] })
                    .translate(spireMove)
                    .setColor(0, 1, 0);

    }

    var blocks = [];
    blocks.push(building());
    blocks.push(spire());
    blocks.push(sides());
    return union(blocks);

}
