import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //we can send image up to 4 megabytes
  experimental:{
    serverActions:{
      bodySizeLimit:"4mb"
    }
  },
  images:{
    domains : ["lh3.googleusercontent.com","utfs.io","ln1537i51v.ufs.sh",'g1ktp9t6gh.ufs.sh']
  }
};

export default nextConfig;
