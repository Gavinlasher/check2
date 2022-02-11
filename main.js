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
    name: "Gc2080",
    cost: 500,
    quantity: 15,
  },
  Gc3060: {
    name: "Gc3060",
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
    bitcoin += upgrade.clickPower * upgrade.quantity;
  }
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
  let autoUpgrade = autoUpgrades[name];
  if (bitcoin < upgrade.cost) {
    return console.log("not enough funds");
  }
  if (bitcoin < autoUpgrade.cost) {
    return console.log("not enough funds");
  }
  bitcoin -= upgrade.cost;
  bitcoin -= autoUpgrade.cost;
  //   main.clickPower += miner.clickPower;
  upgrade.quantity++;
  upgrade.cost *= 2;
  autoUpgrade.quantity++;
  autoUpgrade.cost *= 2;
  draw();
}
// let graphic = setInterval(autoUpgrade, 2000);
