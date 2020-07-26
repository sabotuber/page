$("#calc-btn").on('click', function () {
  let currentLevel = parseInt(document.getElementById("currentLevel").value);
  let targetLevel = parseInt(document.getElementById("targetLevel").value);
  let currentExp = parseInt(document.getElementById("currentExp").value);
  let nextExp = parseInt(document.getElementById("nextExp").value);
  // 経験値タイプの特定
  let expType = expTable(currentLevel, currentExp, nextExp);
  let targetExp = 0;
  let targetExp_ = 0;

  if (expType == "error1") {
    $("#result").html('該当する経験値タイプが見つかりません。<br>入力値を確認の上、入力値に誤りがない場合は<a href="https://twitter.com/sabotuber">@sabotuber</a>までご連絡ください。');
    return;
  } else if (expType == "error2") {
    $("#result").html('現在のレベルでは経験値タイプを一つに絞ることができません。<br>差し支えなければレベルを上げてから再度入力してください。');
    return;
  }

  let xl = document.getElementsByName("item")[0].checked;
  let l = document.getElementsByName("item")[1].checked;
  let m = document.getElementsByName("item")[2].checked;
  let s = document.getElementsByName("item")[3].checked;
  let xs = document.getElementsByName("item")[4].checked;
  let cnt_xl = 0;
  let cnt_l = 0;
  let cnt_m = 0;
  let cnt_s = 0;
  let cnt_xs = 0;
  let ame = 0;
  const exp_xl = 30000;
  const exp_l = 10000;
  const exp_m = 3000;
  const exp_s = 800;
  const exp_xs = 100;

  targetExp = expCalc(targetLevel, currentExp, expType);
  $("#result").html('経験値タイプ：' + expType + '、必要経験値：' + targetExp);
  if (!((xs && targetExp % 100 == 0) || (s && targetExp % 800 == 0) || (m && targetExp % 3000 == 0) || (l && targetExp % 10000 == 0) || (xl && targetExp % 30000 == 0))) {
    let ame = 1;
    targetExp_diff = targetExp - expCalc(targetLevel - 1, currentExp, expType);
  }
  if (xl) {
    cnt_xl = Math.floor(targetExp / exp_xl);
    targetExp -= exp_xl * cnt_xl;
  }
  if (l) {
    cnt_l = Math.floor(targetExp / exp_l);
    targetExp -= exp_l * cnt_l;
  }
  if (m) {
    cnt_m = Math.floor(targetExp / exp_m);
    targetExp -= exp_m * cnt_m;
  }
  if (s) {
    cnt_s = Math.floor(targetExp / exp_s);
    targetExp -= exp_s * cnt_s;
  }
  if (xs) {
    cnt_xs = Math.floor(targetExp / exp_xs);
    targetExp -= exp_xs * cnt_xs;
  }


  if (xl) {
    $("#result").append('<br>経験アメXL：'+cnt_xl+"個");
  }
  if (l) {
    $("#result").append('<br>経験アメL：'+cnt_l+"個");
  }
  if (m) {
    $("#result").append('<br>経験アメM：'+cnt_m+"個");
  }
  if (s) {
    $("#result").append('<br>経験アメS：'+cnt_s+"個");
  }
  if (xs) {
    $("#result").append('<br>経験アメXS：'+cnt_xs+"個");
  }

  
  if (targetExp != 0) {
    $("#result").append('<br>残りは不思議なアメを使ってピッタリにする');
    $("#result").append('<br>');
    $("#result").append('<br>不足経験値：'+targetExp);
    $("#result").append('<br>※'+(targetLevel - 1)+'レベルから'+targetLevel+'レベルになる為に必要な経験値'+ targetExp_diff);


  }else{
    $("#result").append('<br>経験アメだけでちょうどピッタリになる');
  }


});

function expTable(currentLevel, currentExp, nextExp) {
  // 次のレベルと、次のレベルまでに必要な経験値から、経験値タイプを逆残
  let nextLevel = currentLevel + 1;
  let nextLevelExp = currentExp + nextExp;
  let Flag = new Array();

  // 60万タイプ
  if (2 <= nextLevel && nextLevel <= 50) {
    if (nextLevelExp == Math.floor(Math.pow(nextLevel, 3) * (100 - nextLevel) / 50)) {
      Flag.push("600,000");
    }
  } else if (51 <= nextLevel && nextLevel <= 68) {
    if (nextLevelExp == Math.floor(Math.pow(nextLevel, 3) * (150 - nextLevel) / 100)) {
      Flag.push("600,000");
    }
  } else if (69 <= nextLevel && nextLevel <= 98) {
    if (nextLevelExp == Math.floor(Math.pow(nextLevel, 3) * Math.floor(637 - 10 * nextLevel / 3) / 500)) {
      Flag.push("600,000");
    }
  } else if (99 <= nextLevel && nextLevel <= 100) {
    if (nextLevelExp == Math.floor(Math.pow(nextLevel, 3) * (160 - nextLevel) / 100)) {
      Flag.push("600,000");
    }
  }
  // 80万タイプ
  if (nextLevelExp == Math.floor(0.8 * Math.pow(nextLevel, 3))) {
    Flag.push("800,000");
  }
  // 100万タイプ
  if (nextLevelExp == Math.floor(Math.pow(nextLevel, 3))) {
    Flag.push("1,000,000");
  }
  // 105万タイプ
  if (nextLevelExp == Math.floor((1.2 * Math.pow(nextLevel, 3)) - (15 * Math.pow(nextLevel, 2)) + (100 * nextLevel) - 140)) {
    Flag.push("1,050,000");
  }
  // 125万タイプ
  if (nextLevelExp == Math.floor(1.25 * Math.pow(nextLevel, 3))) {
    Flag.push("1,250,000");
  }
  // 164万タイプ
  if (2 <= nextLevel && nextLevel <= 15) {
    if (nextLevelExp == Math.floor(Math.pow(nextLevel, 3) * (24 + Math.floor((nextLevel + 1) / 3)) / 50)) {
      Flag.push("1,640,000");
    }
  } else if (16 <= nextLevel && nextLevel <= 36) {
    if (nextLevelExp == Math.floor(Math.pow(nextLevel, 3) * (14 + nextLevel) / 50)) {
      Flag.push("1,640,000");
    }
  } else if (37 <= nextLevel && nextLevel <= 100) {
    if (nextLevelExp == Math.floor(Math.pow(nextLevel, 3) * (32 + Math.floor(nextLevel / 2)) / 50)) {
      Flag.push("1,640,000");
    }
  }

  if (Flag.length < 1) {
    return "error1";
  } else if (Flag.length > 1) {
    return "error2";
  } else {
    return Flag[0];
  }
}

function expCalc(targetLevel, currentExp, expType) {
  let targetExp = 0;
  switch (expType) {
    case '600,000':
      if (2 <= targetLevel && targetLevel <= 50) {
        targetExp = Math.floor(Math.pow(targetLevel, 3) * (100 - targetLevel) / 50);
      } else if (51 <= targetLevel && targetLevel <= 68) {
        targetExp = Math.floor(Math.pow(targetLevel, 3) * (150 - targetLevel) / 100);
      } else if (69 <= targetLevel && targetLevel <= 98) {
        targetExp = Math.floor(Math.pow(targetLevel, 3) * Math.floor(637 - 10 * nextLevel / 3) / 500);
      } else if (99 <= targetLevel && targetLevel <= 100) {
        targetExp = Math.floor(Math.pow(targetLevel, 3) * (160 - targetLevel) / 100);
      }
      break;
    case '800,000':
      targetExp = Math.floor(0.8 * Math.pow(targetLevel, 3));
      break;
    case '1,000,000':
      targetExp = Math.floor(Math.pow(targetLevel, 3));
      break;
    case '1,050,000':
      targetExp = Math.floor((1.2 * Math.pow(targetLevel, 3)) - (15 * Math.pow(targetLevel, 2)) + (100 * targetLevel) - 140);
      break;
    case '1,250,000':
      targetExp = Math.floor(1.25 * Math.pow(targetLevel, 3));
      break;
    case '1,640,000':
      if (2 <= targetLevel && targetLevel <= 15) {
        targetExp = Math.floor(Math.pow(targetLevel, 3) * (24 + Math.floor((targetLevel + 1) / 3)) / 50);
      } else if (16 <= targetLevel && targetLevel <= 36) {
        targetExp = Math.floor(Math.pow(targetLevel, 3) * (14 + targetLevel) / 50);
      } else if (37 <= targetLevel && targetLevel <= 100) {
        targetExp = Math.floor(Math.pow(targetLevel, 3) * (32 + Math.floor(targetLevel / 2)) / 50);
      }
      break;
  }
  return targetExp -= currentExp;
}
