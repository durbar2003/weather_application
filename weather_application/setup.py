__import__('setuptools').setup()
from setuptools import setup, find_packages

setup(
    name='weather_application',
    version='0.1.0',
    description='A JupyterLab extension to display weather information of a city',
    author='durbar',
    author_email='durbardibyo@gmail.com',
    packages=find_packages(),
    install_requires=[
        'jupyterlab>=3.0.0',
    ],
    zip_safe=False,
    include_package_data=True,
)