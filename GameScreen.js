var isFacingRight = true;

var GameScreen = {
    preload: function() {
        game.load.spritesheet('gr', 'assets/images/guy_walk_spritesheet.png', 58, 87, 8);
        game.load.spritesheet('mo', 'assets/images/marioWalk.png', 40, 34, 8);
        game.load.spritesheet('mm', 'assets/images/megamanrun.png',90, 104, 4);
        game.load.image('floor', 'assets/images/floor.jpg');
    },
    create: function() {
        this.jumpTimer = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 2000;
        
        //Keyboard
         this.wasd = {
             up: game.input.keyboard.addKey(Phaser.Keyboard.W),
             down: game.input.keyboard.addKey(Phaser.Keyboard.S),
             left: game.input.keyboard.addKey(Phaser.Keyboard.A),
             right: game.input.keyboard.addKey(Phaser.Keyboard.D)
         };
        
        this.floor = game.add.sprite(0, game.height - 50, 'floor');
        this.floor.height = 50;
        this.floor.width = game.width;
        
        game.physics.arcade.enable(this.floor);
        
        this.floor.body.immovable = true;
        
        this.floor.body.collideWorldBounds = true;
        
        this.grg = game.add.sprite(40, 10, 'gr');
        

        game.physics.arcade.enable(this.grg);
        this.grg.animations.add('walk');
        this.grg.animations.play('walk', 10, true);

        this.mro = game.add.sprite(1000, 400, 'mo');
        this.mgm = game.add.sprite(900, 200, 'mm');
        
        game.physics.arcade.enable(this.mro);
        game.physics.arcade.enable(this.mgm);
        
        this.mro.animations.add('walk2');
        this.mgm.animations.add('walk3');

        this.mro.animations.play('walk2', 8, true);
        this.mgm.animations.play('walk3', 4, true);
        
        this.grg.body.collideWorldBounds = true;
        this.mro.body.collideWorldBounds = true;
        this.mgm.body.collideWorldBounds = true;
        

    },
    
    update: function() {        
        game.physics.arcade.collide(this.floor, this.grg);
        game.physics.arcade.collide(this.floor, this.mro);
        game.physics.arcade.collide(this.floor, this.mgm);

        if (this.wasd.right.isDown) {
            this.grg.body.velocity.x = 350;
            this.grg.anchor.setTo(.5,1);
            this.grg.scale.x = 1;
        } else if (this.wasd.left.isDown) { //if the left arrow is pressed, move to the left
            this.grg.anchor.setTo(.5,1);
            this.grg.scale.x = -1;
            this.grg.body.velocity.x = -350;
        } else if (this.wasd.down.isDown) { //if the down arrow is pressed, move downwards
            this.grg.body.velocity.y = 350;
        } else {
            this.grg.body.velocity.x = 0;
        }
        
        
        if (this.mro.body.x <= game.world.width - 50 && isFacingRight) {
            this.mro.body.velocity.x = 400;//is going to right of screen going this fast
            this.mro.anchor.setTo(.5,1);//will flip to the left
            this.mro.scale.x = 1;//will flip to the left
        } else if (this.mro.body.x !== 0){//makes mario flip
            isFacingRight = false;//causes him to go left
            this.mro.anchor.setTo(.5,1);//will flip to the right
            this.mro.scale.x = -1;//will flip to the right
            this.mro.body.velocity.x = -400;//is going to the left of the screen going this fast
        } else {
            isFacingRight = true;
            
        }
        if (this.mgm.body.x <= game.world.width - 50 && isFacingRight) {
            this.mgm.body.velocity.x = 450;//is going to right of screen going this fast
            this.mgm.anchor.setTo(.5,1);//will flip to the left
            this.mgm.scale.x = 1;//will flip to the left
        } else if (this.mgm.body.x !== 0){//makes megaman flip
            isFacingRight = false;//causes him to go left
            this.mgm.anchor.setTo(.5,1);//will flip to the right
            this.mgm.scale.x = -1;//will flip to the right
            this.mgm.body.velocity.x = -450;//is going to the left of the screen going this fast
        } else {
            isFacingRight = true;
            
        }
         if (this.wasd.up.isDown && game.time.now > this.jumpTimer)
        {   
            console.log("here");   
            this.grg.body.velocity.y = -700;
            this.jumpTimer = game.time.now + 750;     
        }
//        this.mro.animations.add('walk');
//        this.mro.animations.play('walk', 10, true);
//        
//        game.physics.arcade.enable(this.mro);
//        
//        this.mro.body.immovable = true;
//        
//        this.mro.body.collideWorldBounds = true
//        
//        this.mro.anchor.setTo(.5,1);
//        this.mro.scale.x = 1;
//        this.mro.anchor.setTo(.5,1);
//        this.mro.scale.x = -1;
//        this.mro.body.velocity.x = 400;
//        this.mro.body.velocity.y = 400;

    }
    
};