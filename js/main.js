/*
必要となるレイヤー

hair_f
head
arm_l
body
arm_r
hair_b
bg

*/


// 描画用canvasの設定
const app = new PIXI.Application({
  preserveDrawingBuffer: true,
  view: document.getElementById("test1"),
  width: 200,
  height: 170,
  backgroundColor: 0xffffff,
});

document.body.appendChild(app.view)

// 親コンテナ設定
const container = new PIXI.Container();
container.width = 200;
container.height = 170;
container.x = 0;
container.y = 0;
container.sortableChildren = true;

app.stage.addChild(container);

// テクスチャリスト作成
const textureList = new Object();
textureList.tex1_1 = PIXI.Texture.from('img/test_layer1/test1-1.png');
textureList.tex1_2 = PIXI.Texture.from('img/test_layer1/test1-2.png');
textureList.tex2_1 = PIXI.Texture.from('img/test_layer2/test2-1.png');
textureList.tex2_2 = PIXI.Texture.from('img/test_layer2/test2-2.png');

// スプライトリスト作成(スプライト=レイヤーとして使用する)
const spriteList = new Object();

spriteList.sprite1 = new PIXI.Sprite(textureList.tex1_1);
spriteList.sprite1.anchor.set(0);
spriteList.sprite1.x = 0;
spriteList.sprite1.y = 0;
spriteList.sprite1.zIndex = 0;

container.addChild(spriteList.sprite1);

spriteList.sprite2 = new PIXI.Sprite(textureList.tex2_1);
spriteList.sprite2.anchor.set(0);
spriteList.sprite2.x = 0;
spriteList.sprite2.y = 0;
spriteList.sprite2.zIndex = 0;

container.addChild(spriteList.sprite2);

// ソートする
container.sortChildren();

// 毎フレーム何かしら処理を行う場合はここに記述(アニメーション等)
app.ticker.add((delta) => {
});

// omload処理
window.onload = function () {
  // 合成ボタン設定
  document.querySelector("#btn-concat").addEventListener("click", () => {
    let link = document.createElement("a");
    link.href = app.view.toDataURL("image/png");
    link.download = "result.png";
    link.click();
  });
}

// ラジオボタン監視処理
$(function () {
  $('input:radio').change(function () {
    let val = $(this).val();
    let name = $(this).attr("name");
    spriteList[name].texture = textureList[val];
  });
});


// 画像の透明度
// @param (target)  対象のcanvasId
// @param (alpha)  透明度
// @return (void)
function alphaSlider(target,alpha){
  document.getElementById(target+"_alpha").innerHTML=alpha;
  spriteList[target].alpha = alpha / 100;
}

