let bitcoin = 0;
// let value = 0;

// let main = {
//   bitcoin: 0,
//   clickPower: 1,
//   miner: 0,
//   minerv2: 0,
// };

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
    clickPower: 48,
    cost: 500,
    quantity: 0,
  },
  Gc3060: {
    name: "gc3060",
    cost: 1000,
    quantity: 0,
    clickPower: 20,
  },
};

function mineBitcoin() {
  //   bitcoin += main.clickPower;
  bitcoin++;
  clickMiners();
  autoUpgrade();
  draw();
}

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
  document.getElementById("bitcoin").innerText = bitcoin;
  document.getElementById("miner").innerText = clickUpgrades.miner.quantity;
  document.getElementById("minerv2").innerText = clickUpgrades.minerv2.quantity;
  document.getElementById("Gc2080").innerText = autoUpgrades.Gc2080.quantity;
  document.getElementById("Gc3060").innerText = autoUpgrades.Gc3060.quantity;
}

function buyMiner(name) {
  let upgrade = clickUpgrades[name];
  if (bitcoin < upgrade.cost) {
    return console.log("not enough funds");
  }
  bitcoin -= upgrade.cost;
  upgrade.quantity++;
  upgrade.cost *= 2;
  draw();
}

function buyAuto(name) {
  let auto = autoUpgrades[name];
  if (bitcoin < auto.cost) {
    return console.log("not enough funds");
  }
  bitcoin -= auto.cost;
  auto.quantity++;
  auto.cost *= 2;
  draw();
}

setInterval(autoUpgrade, 2000);
