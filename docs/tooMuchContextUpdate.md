# 太多 async update?

在 `src/components/admin/classList` 中，因為使用了兩個 context，且兩個 context 皆為 async call，導致此 component 會被呼叫多達 6 次。需要想想怎麼減少。
