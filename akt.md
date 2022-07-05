### Install

phtyon 3.10 安装 https://zhuanlan.zhihu.com/p/506491209

```
sudo apt update
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev

wget https://www.python.org/ftp/python/3.10.5/Python-3.10.5.tgz
tar -zvxf Python-3.10.5.tgz
cd Python-3.10.5/
./configure --enable-optimizations
sudo make
sudo make install
sudo rm /usr/bin/python
sudo ln -s /usr/local/bin/python3.10 /usr/bin/python
sudo ln -s /usr/local/bin/pip3.10 /usr/bin/pip
```

https://aktools.akfamily.xyz/#fastapi

```
pip install aktools --upgrade -i https://pypi.org/simple
python -m aktools -P 8001
```

ECS 安全组
防火墙

```
sudo apt-get install ufw
sudo ufw enable
sudo ufw status

sudo ufw allow smtp　#允许所有的外部IP访问本机的25/tcp (smtp)端口
sudo ufw allow 22/tcp #允许所有的外部IP访问本机的22/tcp (ssh)端口
sudo ufw allow 53 #允许外部访问53端口(tcp/udp)
sudo ufw allow from 192.168.1.100 #允许此IP访问所有的本机端口
sudo ufw deny smtp # 禁止外部访问smtp服务
sudo ufw delete allow smtp # 删除上面建立的某条规则
```
