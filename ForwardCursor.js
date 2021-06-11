var SCRIPT_TITLE = "Forward Cursor";

function getClientInfo() {
  return {
    "name" : SV.T(SCRIPT_TITLE),
    "author" : "Chomstudio",
    "versionNumber" : 1.1,
    "minEditorVersion" : 65537
  };
}

function getTranslations(langCode) {
  if(langCode == "ja-jp") {
    return [
      ["Forward Cursor", "カーソルを進める"]
    ];
  }
  return [];
}

function main() {
  pb = SV.getPlayback();
  ta = SV.getProject().getTimeAxis();
  cs = SV.getMainEditor().getNavigation();

  //現在位置の取得
  currentSeconds = pb.getPlayhead();

  //現在の表示エリアを取得
  viewRange = cs.getTimeViewRange();
  viewLengthBlick = viewRange[1] - viewRange[0];
  viewLength = ta.getSecondsFromBlick(viewLengthBlick);

  //現在位置を進める
  //進める秒数は表示エリアの1/4
  advancedSeconds = currentSeconds + (viewLength/4);
  pb.seek( advancedSeconds );

  //さらにその位置の(表示秒数*1/4)秒前から表示（スクロール）する
  advencedViewSeconds = advancedSeconds - (viewLength/4);
  if (advencedViewSeconds < 0) advencedViewSeconds = 0
  advancedBlick = ta.getBlickFromSeconds( advencedViewSeconds );
  cs.setTimeLeft( advancedBlick );

  //おわり
  SV.finish();
}
