function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner:null,
            logMessages:[],
        };
    },
    computed: {
        monsterBarStyles() {
            if(this.monsterHealth<0){
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            if(this.playerHealth<0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },

    },
    watch: {
        playerHealth(val) {
            if (val <= 0 && this.monsterHealth <= 0) {
                this.winner='draw';
            } else if (val <= 0) {
                this.winner='monster'
            }
        },
        monsterHealth(val) {
            if (val <= 0 && this.playerHealth <= 0) {
                this.winner='draw';
            } else if (val<=0){
                this.winner='player'
            }
        },
    },
    methods: {
        startNewGame(){
            this.playerHealth= 100;
            this.monsterHealth= 100;
            this.currentRound= 0;
            this.winner=null;
            this.logMessages=[];
        },
        attackMonster() {
            this.currentRound++;
            let attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMessage('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            let attackValue = getRandomValue(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
            this.addLogMessage('monster','attack',attackValue);

        },
        specialAttackMonster() {
            this.currentRound++;
            let attackValue = getRandomValue(10, 25);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMessage('player','attack',attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            let healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth = this.playerHealth + healValue;
            }
            this.addLogMessage('player','heal',healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner='monster';
        },
        addLogMessage(who,whatHappened,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:whatHappened,
                actionValue:value,
            });
        }
    },

});

app.mount('#game');