# Authentication Migration

## 説明

このプロジェクトは、ニフクラ mobile backendからエクスポートした会員データ(`user.json`)をFirebase Authenticationへインポートするためのツールです。JSON形式の会員データを読み込み、Firebase Authenticationサービスにこれらのユーザーをインポートします。

## 前準備

1. プロジェクトの依存関係をインストールします。

    ```
    npm install
    ```

2. `serviceAccountKey.json.example`ファイルをコピーして`serviceAccountKey.json`を作成します。Firebaseコンソールから取得した設定内容をこのファイルにコピー＆ペーストします。

3. `data`ディレクトリにニフクラ mobile backendからエクスポートした`user.json`を配置します。このファイルにはインポートするユーザーデータが含まれている必要があります。

## 使用方法

以下のコマンドを使用して、Firebase Authenticationにユーザーをインポートします。

- 実稼働環境でのインポート:

    ```
    npm run import
    ```

- Firebase Emulatorを使用したローカルでのテスト:

    ```
    npm run import:emu
    ```
  - Firebase Emulatorを利用する場合、https://github.com/monaca-samples/authentication-basic プロジェクトを使って事前にFirebase Emulatorを起動しておく必要があります。
