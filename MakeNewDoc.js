//MakeNewDoc.js　初回作成　2021年３月２８日
//2021年３月３０日　リーダーで使用できない対応を加えた
//http://force4u.cocolog-nifty.com/
/*
Public Domain
href="http://creativecommons.org/publicdomain/zero/1.0/
自由に改変再配布等行ってください。
*/

/*
ファイルメニューに
→新規ブランク書類（縦横指定）を作成
実行するとダイアログが表示されます。
*/

/*
Adobe Acrobat DC2021で確認
インストール先は以下の任意のどれか
アプリケーションドメイン
/Applications/Adobe Acrobat XI Pro/Adobe Acrobat Pro.app/Contents/Resources/JavaScripts
ローカルドメイン
/Library/Application Support/Adobe/Acrobat/11.0/JavaScripts
ユーザードメイン
/Users/ユーザー名/Library/Application Support/Adobe/Acrobat/11.0/JavaScripts
*/
/*
ダウンロードしたファイルは文字コードをUTF16に変更する必要があります
*/
/*
用紙サイズはpt（ポイント）
用紙サイズの計算方法は
ミリサイズ/25.4)*(72)
*/
//メニューを生成

////////////////新規ドキュメントを作成する
trustedNewDoc = app.trustedFunction( function (nWidth, nHeight)
{ 
try {
app.beginPriv(); 
switch( arguments.length ) { 
case 2: 

app.newDoc( nWidth, nHeight ); 
break; 
case 1: 
app.newDoc( nWidth ); 
break; 
default: 
app.newDoc(); 
} 
app.endPriv();
}catch(e) {
var strErrMes = "作成に失敗しました（数値以外）";console.show();console.println(strErrMes);
}
})

////////////////メニュー実行時のファンクションs
function doOpenDialog(){
////ダイアログを出す
app.execDialog(OpenDialog);
////////////////戻り値を格納
var pHeight = this.strAsk1;
var pWidth = this.strAsk2;

console.println(pWidth);
console.println(pHeight);
////////////////ピクセル→ミリ換算
var nWidth = ((pWidth / 25.4) * (72));
var nHeight =  ((pHeight / 25.4) * (72));
////////////////新規書類ファンクションに値を渡す
trustedNewDoc(nWidth,nHeight);

}
////////////////ダイアログのファンクション
var OpenDialog = {
    initialize:
    function(dialog) {
        this.strAsk1 = "縦高";
        this.strAsk2 = "横幅";
        this.CancelText = "キャンセルしました";
        dialog.load({
            "Ask1": this.strAsk1,
            "Ask2": this.strAsk2
        });
        console.println("initialize");
    },
    commit: function(dialog)
    {
        var results = dialog.store();
        strAsk1 = results["Ask1"];
        strAsk2 = results["Ask2"];
        console.println("commit" + this.strAsk1 + strAsk2);
    },   
    ok: function(dialog) {
        console.println("ok");
    },
    cancel: function(dialog) {
        strAsk1 = this.CancelText;
        strAsk2 = this.CancelText;
        console.println("cancel");
    },
    description:
    {
        name: "Dialog Box",
        align_children: "align_left",
        width: 420,
        height: 200,
        elements:
        [
        {
            type: "view",
            align_children: "align_row",
            elements:
            [
            {
                type: "view",
                elements:
                [
                {
                    item_id: "sta1",
                    type: "static_text",
                    alignment: "align_fill",
                    name: "横幅：mm"
                },
                {
                    item_id: "Ask2",
                    type: "edit_text",
                    char_width: 20,
                    multiline: false,
                    char_height: 5
                },
                ]
            }
            ,
            {
                type: "view",
                elements:
                [
                {
                    item_id: "sta2",
                    type: "static_text",
                    alignment: "align_fill",
                    name: "縦高：mm"
                },
                {
                    item_id: "Ask1",
                    type: "edit_text",
                    char_width: 20,
                    multiline: false,
                    char_height: 5
                },
                ]
            }
            ]
        },
        {
            alignment: "align_right",
            type: "ok_cancel",
            ok_name: "Ok",
            cancel_name: "Cancel"
        }
        ]
    }
};


////////////////メニュー部
//////////ファイルメニューを宣言
menuParent = "File";
//////////メニュー本体＝実行時はdoOpenDialogファンクションを実行

/////////////////////////////DCの時はメニューを出す
if(app.viewerType == "Exchange-Pro") {
app.addMenuItem({
	cName:"doOpenDialog",
	cUser:"→新規ブランク書類（横x縦指定）",
	cParent:menuParent,
	cExec: "doOpenDialog()",
	nPos:0});
}
/////////////////////////////リーダーでは利用できない
if(app.viewerType == "Reader") {
app.addMenuItem({
	cName:"doOpenDialog",
	cUser:"→新規ブランク書類（横x縦指定）",
	cParent:menuParent,
	cExec: "doOpenDialog()",
	cEnable: "event.rc = (false);",
	nPos:0});
}



