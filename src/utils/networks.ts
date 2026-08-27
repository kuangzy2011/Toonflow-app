import os from "os";

interface NetAddr {
  interface: string; // 网卡名 eth0, enp0s3, wlan0, lo
  family: "IPv4" | "IPv6";
  address: string;
  netmask: string;
  internal: boolean; // true=本地回环lo
}

/**
 * 获取本机所有网络接口地址
 */
export function getNetworkAddrs(): NetAddr[] {
  const ni = os.networkInterfaces();
  const result: NetAddr[] = [];

  for (const [ifName, addrs] of Object.entries(ni)) {
    if (!addrs) continue;
    for (const a of addrs) {
      if(a.family == "IPv6") continue;
      result.push({
        interface: ifName,
        family: a.family as "IPv4" | "IPv6",
        address: a.address,
        netmask: a.netmask,
        internal: a.internal,
      });
    }
  }
  return result;
}

/**
 * 获取所有非回环 IPv4 地址（最常用：机器对外ip）
 */
export function getExternalIPv4(networks: NetAddr[] | undefined): string[] {
  if(networks == undefined) {
    return getNetworkAddrs()
      .filter(item => item.family === "IPv4" && !item.internal)
      .map(item => item.address);
  }

  //return networks.filter(item => item.family === "IPv4" && !item.internal)
  return networks.filter(item => item.family === "IPv4" && !item.internal)
      .map(item => item.address);
}

