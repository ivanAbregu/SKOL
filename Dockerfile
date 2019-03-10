FROM python:3.6.0
MAINTAINER Ivan Abregu
ENV PYTHONUNBUFFERED 1


RUN apt-get update -y \
    && apt-get -y install ruby-sass binutils \
    && rm -rf /var/lib/apt/lists/*

RUN cd /tmp/ && wget http://download.osgeo.org/gdal/1.11.2/gdal-1.11.2.tar.gz \
    && tar xzf gdal-1.11.2.tar.gz && cd ./gdal-1.11.2 \
    && ./configure && make && make install && cd .. && rm -rf gdal-1.11.2 && rm gdal-1.11.2.tar.gz \
    && wget http://download.osgeo.org/geos/geos-3.4.2.tar.bz2 && tar xjf geos-3.4.2.tar.bz2 \
    && cd geos-3.4.2 && ./configure && make && make install && cd .. \
    && rm geos-3.4.2.tar.bz2 && rm -rf geos-3.4.2 \
    && echo /usr/local/lib >> /etc/ld.so.conf && ldconfig

RUN mkdir -p /usr/src/app && cd /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r /usr/src/app/requirements.txt --no-cache-dir

RUN chmod 777 /usr/src/app/init.sh
RUN chmod +x /usr/src/app/init.sh
RUN chmod 777 /usr/src/app/init_local.sh
RUN chmod +x /usr/src/app/init_local.sh

CMD ["/usr/src/app/init.sh"]
