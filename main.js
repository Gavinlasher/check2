let bitcoin = 0;
let totalBitcoinPerMin = 0


let clickUpgrades = {
  miner: {
    name: "miner",
    cost: 20,
    clickPower: 5,
    quantity: 0,
  },
  minerv2: {
    name: "minerv2",
    cost: 100,
    clickPower: 10,
    quantity: 0,
  },
};

let autoUpgrades = {
  Gc2080: {
    name: "gc2080",
    cost: 500,
    quantity: 0,
    clickPower:50
  },
  Gc3060: {
    name: "gc3060",
    cost: 1000,
    quantity: 0,
    clickPower: 100,
  },
};

function mineBitcoin() {
  bitcoin++;
  clickMiners();
  autoUpgrade();
  draw();
}
let totalMulti = autoUpgrades.Gc2080.quantity + autoUpgrades.Gc3060.quantity

function autoUpgrade() {
  for (const key in autoUpgrades) {
    let upgrade = autoUpgrades[key];
    if (upgrade.quantity > 0) {
      bitcoin += upgrade.clickPower * upgrade.quantity;
      //   setInterval(autoUpgrade, 2000);
    }
  }
  draw();
}

function clickMiners() {
  // REVIEW itterate over click upgrades with for in
  for (const key in clickUpgrades) {
    let upgrade = clickUpgrades[key];
    bitcoin += upgrade.clickPower * upgrade.quantity;
  }
}

function draw() {

let temp = `<div class="col-lg-12 ">
<div class="store bg-dark text-light text-center">
    <h3>Store</h3>
    <div class="click-upgrades p-3">
        <h5>Click Upgrades</h5>
        <div class="d-flex justify-content-center">
            <button class="btn btn-outline-light ${bitcoin < clickUpgrades.miner.cost ? 'disabled' : ''}" onclick="buyMiner('miner')">miner</button>
            <p>Cost = <span id="minercost">0</span></p>
            <p>Upgrade = <span id="minercost2">0</span></p>
            <button class="btn btn-outline-light ${bitcoin < clickUpgrades.minerv2.cost ? 'disabled' : '' }" onclick="buyMiner('minerv2')">minerv2</button>
            <p> Cost = <span id="minerv2cost">0</span></p>
            <p> Upgrade = <span id="minerv2cost2">0</span></p>
        </div>
    </div>
    <div class="passive-upgrade text-center">
        <h5> Graphics Upgrade</h5>
        <div class="d-flex justify-content-center">
            <button class="btn btn-outline-light ${bitcoin < autoUpgrades.Gc2080.cost ? 'disabled' : ''}" onclick="buyAuto('Gc2080')">Gc2080</button>
            <p> Cost = <span id="2080">0</span></p>
            <p> Upgrade = <span id="20802"></span></p>
            <button class="btn btn-outline-light ${bitcoin < autoUpgrades.Gc3060.cost ? 'disabled' : ''}" onclick="buyAuto('Gc3060')">Gc3060</button>
            <p> Cost =<span id="3060">0</span></p>
            <p> Upgrade = <span id="30602">0</span></p>
        </div>
    </div>
</div>
</div>
`
document.getElementById('btn').innerHTML = temp
document.getElementById("bitcoin").innerText = bitcoin;
document.getElementById("miner").innerText = clickUpgrades.miner.quantity;
  document.getElementById("minerv2").innerText = clickUpgrades.minerv2.quantity;
  document.getElementById("Gc2080").innerText = autoUpgrades.Gc2080.quantity;
  document.getElementById("Gc3060").innerText = autoUpgrades.Gc3060.quantity;
  document.getElementById("2080").innerText = autoUpgrades.Gc2080.cost;
  document.getElementById("3060").innerText = autoUpgrades.Gc3060.cost;
  document.getElementById("minercost").innerText = clickUpgrades.miner.cost;
  document.getElementById("minerv2cost").innerText = clickUpgrades.minerv2.cost;
  document.getElementById('minercost2').innerText = clickUpgrades.miner.clickPower;
  document.getElementById('minerv2cost2').innerText =clickUpgrades.minerv2.clickPower;
  document.getElementById('20802').innerText = autoUpgrades.Gc2080.clickPower;
  document.getElementById('30602').innerText = autoUpgrades.Gc3060.clickPower;
  document.getElementById('bitcoinpermin').innerText = totalBitcoinPerMin
  document.getElementById('totalMulti').innerText = totalMulti
}

function buyMiner(name) {
  let upgrade = clickUpgrades[name];
  if (bitcoin < upgrade.cost) {
    return console.log("not enough funds");
  }
  swal("Good job!", "You Bought a Miner", "success");
  bitcoin -= upgrade.cost;
  upgrade.quantity++;
  upgrade.cost *= 2;
  draw();
}

function buyAuto(name) {
  let auto = autoUpgrades[name];
  if (bitcoin < auto.cost) {
    return console.log('not enough funds');
  }
  swal("Good Job!","You Bought a Graphics Card", "success");
totalMulti++
  bitcoin -= auto.cost;
  auto.quantity++;
  auto.cost *= 2;
  draw();
}
function addBitcoinPerMin(){
  let click1 = autoUpgrades.Gc2080.quantity *autoUpgrades.Gc2080.clickPower
  let click2 = autoUpgrades.Gc3060.quantity * autoUpgrades.Gc3060.clickPower
  if(autoUpgrades.Gc2080.quantity > 0 || autoUpgrades.Gc3060.quantity > 0){
    totalBitcoinPerMin = (click1 + click2) * 30
  }
  draw()
}


setInterval(addBitcoinPerMin,1000)
setInterval(autoUpgrade, 2000);
