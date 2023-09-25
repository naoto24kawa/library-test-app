<?php

namespace Database\Seeders;

use App\Models\RentalStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RentalStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RentalStatus::insert([
            // IDは以下の組み合わせで定義
            // 状態 => 待ち:1, 履行中:2, 履行済:3, 変更:4, キャンセル:5
            // 動作 => 予約:10, 貸出:20, 返却:30

            // 予約
            // ['id' => '11', 'name' => '予約待ち', 'description' => ''],
            // ['id' => '12', 'name' => '予約中', 'description' => ''],
            ['id' => '13', 'name' => '予約済', 'description' => 'ユーザが借りることの予約'],
            ['id' => '14', 'name' => '予約変更', 'description' =>  'ユーザが予約を変更したこと'],
            ['id' => '15', 'name' => '予約キャンセル', 'description' =>  'ユーザまたは運営が予約をキャンセルしたこと'],

            // 貸出
            ['id' => '21', 'name' => '貸出待ち', 'description' =>  '運営が貸し出すことの待ち'],
            ['id' => '22', 'name' => '貸出中', 'description' =>  'ユーザが借りていること'],
            // ['id' => '22', 'name' => '貸出済', 'description' =>  ''],
            ['id' => '24', 'name' => '貸出変更', 'description' =>  'ユーザまたは運営が借りる、貸すことを変更したこと'],
            ['id' => '25', 'name' => '貸出キャンセル', 'description' =>  'ユーザまたは運営が借りる、貸すことをキャンセルしたこと'],

            // 返却
            ['id' => '31', 'name' => '返却待ち', 'description' =>  'ユーザが返却することの待ち'],
            // ['id' => '32', 'name' => '返却中', 'description' =>  ''],
            ['id' => '33', 'name' => '返却済', 'description' =>  'ユーザが返却したこと'],
            // ['id' => '34', 'name' => '返却変更', 'description' =>  ''],
            // ['id' => '35', 'name' => '返却キャンセル', 'description' =>  ''],
        ]);
    }
}
