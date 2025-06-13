```ascii
vcp-scanner/
│
├── .env                  # 存放环境变量，如API密钥 (重要：不上传到Github)
├── .gitignore            # 指定哪些文件或文件夹不被Git追踪 (如 node_modules, .env)
├── package.json          # 项目依赖和脚本配置
├── README.md             # 项目说明文档
│
├── config.js             # 存放项目的配置项 (如股票列表, 筛选参数)
├── main.js               # ✨ 项目主入口文件，整个流程的编排器
│
├── results/              # 存放最终筛选结果的文件夹
│   └── YYYY-MM-DD_signals.json  # 每日生成的信号文件示例
│
└── src/                  # 存放所有核心源代码的文件夹
    │
    ├── api/              # 负责与外部API交互的模块
    │   └── fmpService.js # 封装所有与FMP API通信的函数 (如获取股价, 财报等)
    │
    ├── indicators/       # 存放所有技术指标计算函数的模块
    │   ├── movingAverage.js   # 计算移动平均线 (MA)
    │   ├── averageVolume.js   # 计算平均成交量
    │   ├── pricePosition.js   # 计算52周价格位置等
    │   └── atr.js             # 计算平均真实波幅 (用于止损)
    │   └── ... (其他指标)
    │
    ├── stages/           # 核心筛选逻辑，对应你的三个阶段
    │   ├── stageOneFilter.js    # 实现第一阶段的初步量化筛选逻辑
    │   ├── stageTwoVCP.js       # 实现第二阶段的VCP形态识别逻辑
    │   └── stageThreeBreakout.js# 实现第三阶段的突破确认和止损计算
    │
    └── utils/            # 存放通用辅助工具函数
        ├── logger.js     # 用于日志打印，方便调试
        └── fileHelper.js # 用于读写文件 (如保存结果)
```

---

### **各部分功能说明**

* **根目录 (`vcp-scanner/`)**
    * `main.js`: 这是你的“总指挥官”。它会按顺序调用其他模块来完成任务：从`config.js`读取配置 -> 调用`fmpService`获取数据 -> 依次执行`stageOne`, `stageTwo`, `stageThree` -> 最后调用`fileHelper`将结果写入`results`文件夹。
    * `config.js`: 将所有可变参数（比如价格`>12`，MA周期`[50, 150, 200]`）放在这里，未来调整策略时，你只需要修改这一个文件，而不用深入代码。
    * `.env`: **极其重要**。你的FMP API密钥等敏感信息应放在此文件中，并确保`.gitignore`里包含了`.env`，防止密钥泄露到GitHub。

* **`src` 目录 (核心逻辑)**
    * `api/fmpService.js`: 唯一的“数据入口”。所有需要从FMP拿数据的请求都由这个文件里的函数负责。这样做的好处是，如果未来你想更换数据源（比如从FMP换成其他API），你只需要修改这一个文件。
    * `indicators/`: 你的“武器库”。这里存放所有可重用的纯计算函数。例如，`stageOne`和`stageThree`都可能需要计算平均成交量，它们都可以调用`indicators/averageVolume.js`里的同一个函数，遵循了**Don't Repeat Yourself (DRY)**原则。
    * `stages/`: 完美对应你的三步构思。这种结构使得代码逻辑和你的策略思路完全一致，非常清晰。
        * `stageOneFilter.js`接收原始数据，输出一个初步筛选过的股票列表。
        * `stageTwoVCP.js`接收第一阶段的列表，进一步筛选出VCP形态的股票。
        * `stageThreeBreakout.js`接收第二阶段的列表，找出当日突破的股票并计算止损点。
    * `utils/`: “工具箱”，存放与核心业务逻辑无关的通用功能，比如打印日志、保存文件等。

### **工作流程简述**

1.  你在终端运行 `node main.js`。
2.  `main.js` 开始执行，首先加载 `config.js` 里的配置（比如要扫描的股票清单）。
3.  `main.js` 循环处理每支股票，调用 `src/api/fmpService.js` 获取该股票的历史数据。
4.  拿到数据后，`main.js` 把它依次送入：
    * `src/stages/stageOneFilter.js` (使用了 `src/indicators` 里的函数)
    * `src/stages/stageTwoVCP.js`
    * `src/stages/stageThreeBreakout.js`
5.  如果一支股票成功通过所有三个阶段，`main.js` 收集结果。
6.  所有股票处理完毕后，`main.js` 调用 `src/utils/fileHelper.js` 将最终结果保存为一个JSON文件到 `results/` 目录下。